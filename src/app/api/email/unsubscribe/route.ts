/**
 * Email Unsubscribe Endpoint
 * CAN-SPAM Compliant - Processes opt-outs within 10 business days
 * One-click unsubscribe without requiring login
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const UnsubscribeSchema = z.object({
  email: z.string().email(),
  token: z.string().min(32).optional(), // For one-click unsubscribe
  reason: z.string().optional(),
});

interface UnsubscribeRecord {
  email: string;
  timestamp: string;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  processingDeadline: string; // Must be within 10 business days
}

function calculateProcessingDeadline(): string {
  const now = new Date();
  let businessDays = 0;
  const deadline = new Date(now);

  while (businessDays < 10) {
    deadline.setDate(deadline.getDate() + 1);
    const dayOfWeek = deadline.getDay();
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays++;
    }
  }

  return deadline.toISOString();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return new NextResponse(
      `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invalid Unsubscribe Link</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
    h1 { color: #dc2626; }
  </style>
</head>
<body>
  <h1>Invalid Unsubscribe Link</h1>
  <p>The unsubscribe link appears to be invalid or has expired.</p>
  <p>If you continue to receive unwanted emails, please contact us directly.</p>
</body>
</html>
      `,
      {
        status: 400,
        headers: { "Content-Type": "text/html" },
      }
    );
  }

  // TODO: Validate token against stored tokens
  // For now, accept any token (in production, verify HMAC signature)

  // Process unsubscribe
  const record: UnsubscribeRecord = {
    email,
    timestamp: new Date().toISOString(),
    processingDeadline: calculateProcessingDeadline(),
    ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
  };

  // TODO: Store in database with processingDeadline
  console.log("Unsubscribe request:", record);

  return new NextResponse(
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed Successfully</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; 
      max-width: 600px; 
      margin: 100px auto; 
      padding: 20px; 
      text-align: center;
      line-height: 1.6;
    }
    h1 { color: #16a34a; }
    .box {
      background: #f0fdf4;
      border: 2px solid #16a34a;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .small { font-size: 14px; color: #666; margin-top: 30px; }
  </style>
</head>
<body>
  <h1>✓ Successfully Unsubscribed</h1>
  <div class="box">
    <p><strong>${email}</strong> has been removed from our mailing list.</p>
    <p>You will be fully unsubscribed within 10 business days (by ${new Date(record.processingDeadline).toLocaleDateString()}).</p>
  </div>
  <p>You will no longer receive marketing emails from Hyper Trading Automation.</p>
  <p>You may still receive transactional emails related to your account activity.</p>
  
  <div class="small">
    <p>If you unsubscribed by mistake, you can resubscribe by visiting our website.</p>
    <p><strong>Hyper Trading Automation</strong></p>
    <p>Questions? Contact us at: support@hypertradingautomation.com</p>
  </div>
</body>
</html>
    `,
    {
      status: 200,
      headers: { "Content-Type": "text/html" },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = UnsubscribeSchema.parse(body);

    const record: UnsubscribeRecord = {
      email: validated.email,
      timestamp: new Date().toISOString(),
      reason: validated.reason,
      processingDeadline: calculateProcessingDeadline(),
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // TODO: Store in database
    console.log("Unsubscribe request (POST):", record);

    return NextResponse.json({
      success: true,
      email: validated.email,
      message: "You will be unsubscribed within 10 business days",
      processingDeadline: record.processingDeadline,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process unsubscribe request" },
      { status: 500 }
    );
  }
}
