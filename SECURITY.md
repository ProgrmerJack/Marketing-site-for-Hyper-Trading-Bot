# Supabase Security Guide

## Understanding Supabase Keys

### 1. **NEXT_PUBLIC_SUPABASE_ANON_KEY** (Public/Anon Key)
- ✅ **SAFE to expose publicly** (in browser, GitHub, etc.)
- This key is **designed** to be public - it's in your frontend JavaScript bundle
- It has **very limited permissions** - can only do what your RLS policies allow
- With RLS enabled and no public policies (as we configured), this key **cannot** read or write data
- Hackers with this key can only do what anonymous users can do (which is nothing if RLS is properly configured)

### 2. **SUPABASE_SERVICE_ROLE_KEY** (Service Role Key)
- ❌ **NEVER expose publicly** - keep this secret!
- This key **bypasses all RLS policies** - has full admin access
- If exposed, attackers can read/write/delete all data in your database
- Should **only** be used in server-side code (API routes, server actions)
- Must be in `.env.local` or environment variables, never in client code

## Your Current Setup (SECURE ✅)

Your backend is correctly configured:

1. **Browser Client** (`supabase-browser.ts`):
   - Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public key)
   - Safe to expose in browser bundle
   - RLS blocks all access

2. **Server Client** (`supabase-admin.ts`):
   - Uses `SUPABASE_SERVICE_ROLE_KEY` (secret key)
   - Only runs on server (API routes)
   - Never sent to browser

3. **API Routes** (`/api/contact`, `/api/newsletter`):
   - Run server-side only
   - Use admin client to bypass RLS
   - Secret key never exposed to client

## Before Posting to GitHub

### ✅ Safe to Commit (Already Public)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- All your source code

### ❌ NEVER Commit (Keep Secret)
- `SUPABASE_SERVICE_ROLE_KEY`
- `.env.local` file
- Any other API keys (email service, etc.)

### Your `.gitignore` Already Protects You
Check that these lines exist in `.gitignore`:
```
.env*.local
.env
```

## Deployment Checklist

### For Vercel/Netlify/etc:
1. ✅ Push code to GitHub (safe - service key is in `.env.local` which is gitignored)
2. ✅ Add environment variables in deployment platform:
   - `NEXT_PUBLIC_SUPABASE_URL` (will be public)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (will be public)
   - `SUPABASE_SERVICE_ROLE_KEY` (stays secret on server)
3. ✅ Deploy

### Security Best Practices

1. **Row Level Security (RLS)**
   - ✅ You have this enabled
   - ✅ No public policies = anon key can't access data
   - ✅ Service role bypasses RLS (only used server-side)

2. **API Route Security**
   - Your API routes run server-side
   - They use the service role key
   - This key never reaches the browser

3. **Rate Limiting** (Optional but Recommended)
   - Add rate limiting to your API routes to prevent abuse
   - Supabase has built-in rate limiting on the anon key

## Testing Security

Run this in your browser console on your deployed site:
```javascript
// This should FAIL because RLS blocks anon access
const { data, error } = await fetch('https://mzxqfsqhkrwuqfqldocf.supabase.co/rest/v1/contacts', {
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': 'Bearer your-anon-key'
  }
}).then(r => r.json());
console.log(error); // Should show permission denied
```

## Summary

**Q: Can I remove my APIs from the project for privacy?**
A: You should **only** remove the `SUPABASE_SERVICE_ROLE_KEY`. The public URL and anon key are designed to be public.

**Q: Is leaving the public key enough for data to go to my database?**
A: No. The public (anon) key **cannot** write to your database because RLS is enabled with no public policies. Your API routes use the **service role key** (server-side only) to write data.

**Q: Won't the public key give hackers access?**
A: No. With RLS enabled and no public policies, the anon key can't read or write anything. It's like having a key to a locked door - the key works, but the door is bolted shut with RLS.

## What You Should Do

1. ✅ Keep `.env.local` in `.gitignore` (already done)
2. ✅ Never commit `SUPABASE_SERVICE_ROLE_KEY` to GitHub
3. ✅ The public URL and anon key are safe to expose
4. ✅ Your current setup is secure - API routes use service key server-side only
