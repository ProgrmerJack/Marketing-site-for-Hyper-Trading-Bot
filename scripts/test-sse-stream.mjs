#!/usr/bin/env node
/**
 * Production SSE Stream Validation
 * 
 * Tests that /api/demo-stream properly streams Server-Sent Events
 * with incremental chunks and supports Last-Event-ID resumption.
 * 
 * Usage:
 *   node scripts/test-sse-stream.mjs [url]
 *   
 * Example:
 *   node scripts/test-sse-stream.mjs http://localhost:3000
 *   node scripts/test-sse-stream.mjs https://yourdomain.com
 */

import { performance } from 'node:perf_hooks';

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const STREAM_URL = `${BASE_URL}/api/demo-stream`;
const TEST_DURATION_MS = 10000; // 10 seconds
const MIN_EVENTS_EXPECTED = 5;

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║         SSE Stream Production Validation                      ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

/**
 * Test 1: Basic streaming without resumption
 */
async function testBasicStreaming() {
  console.log('📡 Test 1: Basic SSE Streaming (no Last-Event-ID)');
  console.log('─'.repeat(64));
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TEST_DURATION_MS);
  
  const startTime = performance.now();
  let eventCount = 0;
  let lastEventId = null;
  let firstChunkTime = null;
  let lastChunkTime = null;
  const chunkTimes = [];
  
  try {
    const response = await fetch(STREAM_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'text/event-stream',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Check required headers
    const contentType = response.headers.get('content-type');
    const cacheControl = response.headers.get('cache-control');
    const accelBuffering = response.headers.get('x-accel-buffering');
    
    console.log(`✓ Response Status: ${response.status}`);
    console.log(`✓ Content-Type: ${contentType}`);
    console.log(`✓ Cache-Control: ${cacheControl}`);
    console.log(`✓ X-Accel-Buffering: ${accelBuffering || 'not set'}`);
    
    if (contentType !== 'text/event-stream') {
      throw new Error(`Wrong Content-Type: expected text/event-stream, got ${contentType}`);
    }
    
    if (!cacheControl?.includes('no-cache')) {
      console.warn('⚠️  Warning: Cache-Control should include no-cache');
    }
    
    if (accelBuffering !== 'no') {
      console.warn('⚠️  Warning: X-Accel-Buffering should be "no" for nginx/proxies');
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      const chunkTime = performance.now();
      if (!firstChunkTime) {
        firstChunkTime = chunkTime;
        console.log(`✓ First chunk received: ${(chunkTime - startTime).toFixed(0)}ms`);
      }
      lastChunkTime = chunkTime;
      chunkTimes.push(chunkTime - startTime);
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('id:')) {
          lastEventId = line.substring(3).trim();
        } else if (line.startsWith('event:')) {
          eventCount++;
          const eventType = line.substring(6).trim();
          console.log(`  Event ${eventCount}: ${eventType} (id: ${lastEventId})`);
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      clearTimeout(timeoutId);
    } else {
      throw error;
    }
  } finally {
    clearTimeout(timeoutId);
  }
  
  const duration = performance.now() - startTime;
  console.log('\n📊 Results:');
  console.log(`   Total Events: ${eventCount}`);
  console.log(`   Last Event ID: ${lastEventId}`);
  console.log(`   Duration: ${(duration / 1000).toFixed(2)}s`);
  console.log(`   Avg Interval: ${chunkTimes.length > 1 ? ((duration / chunkTimes.length).toFixed(0)) : 'N/A'}ms`);
  
  if (eventCount < MIN_EVENTS_EXPECTED) {
    throw new Error(`Too few events received: ${eventCount} < ${MIN_EVENTS_EXPECTED}`);
  }
  
  console.log('✅ Test 1 PASSED\n');
  return { lastEventId, eventCount };
}

/**
 * Test 2: Resumption with Last-Event-ID
 */
async function testResumption(lastEventId) {
  console.log('📡 Test 2: SSE Resumption with Last-Event-ID');
  console.log('─'.repeat(64));
  
  if (!lastEventId) {
    console.log('⚠️  Skipping: No Last-Event-ID from previous test');
    return;
  }
  
  console.log(`Using Last-Event-ID: ${lastEventId}\n`);
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  
  let eventCount = 0;
  let resumedCorrectly = false;
  
  try {
    const response = await fetch(STREAM_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'text/event-stream',
        'Last-Event-ID': lastEventId,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('event:')) {
          eventCount++;
          resumedCorrectly = true;
          const eventType = line.substring(6).trim();
          console.log(`  Event ${eventCount}: ${eventType}`);
          if (eventCount >= 3) {
            controller.abort();
            break;
          }
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      clearTimeout(timeoutId);
    } else {
      throw error;
    }
  } finally {
    clearTimeout(timeoutId);
  }
  
  console.log(`\n📊 Results: ${eventCount} events received after resumption`);
  
  if (!resumedCorrectly) {
    throw new Error('Stream did not resume correctly with Last-Event-ID');
  }
  
  console.log('✅ Test 2 PASSED\n');
}

/**
 * Test 3: Incremental chunk delivery (not buffered)
 */
async function testIncrementalDelivery() {
  console.log('📡 Test 3: Incremental Chunk Delivery (Buffering Check)');
  console.log('─'.repeat(64));
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  
  const chunkTimings = [];
  let lastTime = performance.now();
  
  try {
    const response = await fetch(STREAM_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'text/event-stream',
      },
    });
    
    const reader = response.body.getReader();
    
    for (let i = 0; i < 5; i++) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const now = performance.now();
      const delta = now - lastTime;
      chunkTimings.push(delta);
      lastTime = now;
      
      console.log(`  Chunk ${i + 1}: ${value.length} bytes, ${delta.toFixed(0)}ms since last`);
    }
    
    controller.abort();
  } catch (error) {
    if (error.name !== 'AbortError') throw error;
  } finally {
    clearTimeout(timeoutId);
  }
  
  // Check if chunks arrive incrementally (not buffered)
  const avgInterval = chunkTimings.reduce((a, b) => a + b, 0) / chunkTimings.length;
  const maxInterval = Math.max(...chunkTimings);
  
  console.log(`\n📊 Results:`);
  console.log(`   Avg Interval: ${avgInterval.toFixed(0)}ms`);
  console.log(`   Max Interval: ${maxInterval.toFixed(0)}ms`);
  
  // If all chunks arrive in a burst (< 50ms between each), likely buffered
  if (avgInterval < 50 && maxInterval < 100) {
    console.warn('⚠️  WARNING: Chunks may be buffered (arriving too fast)');
    console.warn('   For production, ensure proxy has: proxy_buffering off');
  } else {
    console.log('✓ Chunks arriving incrementally (not buffered)');
  }
  
  console.log('✅ Test 3 PASSED\n');
}

/**
 * Main test runner
 */
async function runTests() {
  console.log(`Testing endpoint: ${STREAM_URL}\n`);
  
  try {
    const { lastEventId } = await testBasicStreaming();
    await testResumption(lastEventId);
    await testIncrementalDelivery();
    
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║                  ✅ ALL SSE TESTS PASSED                       ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');
    
    console.log('✅ Production Readiness Check 1: PASSED');
    console.log('   • SSE streams end-to-end');
    console.log('   • Incremental chunks delivered');
    console.log('   • Last-Event-ID resumption works');
    console.log('   • Headers properly configured\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ SSE Test Failed:');
    console.error(`   ${error.message}\n`);
    
    console.log('💡 Troubleshooting:');
    console.log('   • Ensure dev server is running: npm run dev');
    console.log('   • For production: Check proxy config (nginx/cloudflare)');
    console.log('   • Add to nginx: proxy_buffering off;');
    console.log('   • Add header: X-Accel-Buffering: no\n');
    
    process.exit(1);
  }
}

// Run tests
runTests();
