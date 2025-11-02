# Deployment Guide for hyper-quant.tech

## Option 1: Vercel Deployment (Recommended)

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free)
- Domain: hyper-quant.tech

### Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your Git provider
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Add Custom Domain**
   - In Vercel dashboard, go to your project
   - Navigate to Settings → Domains
   - Add "hyper-quant.tech" and "www.hyper-quant.tech"

4. **Configure DNS**
   Update your domain's DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.19.19

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Build Configuration
Your `package.json` is already configured correctly:
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+ (recommended)

## Option 2: Static Export + Traditional Hosting

### 1. Configure Static Export
Add to `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

### 2. Build Static Site
```bash
npm run build
```

### 3. Upload to Hosting
- Upload the `out` folder contents to your web hosting
- Point your domain to the hosting provider

## Option 3: AWS S3 + CloudFront

### 1. Build Static Site
```bash
npm run build
```

### 2. Create S3 Bucket
- Name: hyper-quant.tech
- Enable static website hosting
- Upload `out` folder contents

### 3. Setup CloudFront
- Create distribution pointing to S3 bucket
- Add SSL certificate for HTTPS
- Configure custom domain

### 4. Update DNS
Point your domain to CloudFront distribution

## Environment Variables

If you have environment variables, add them in your deployment platform:

**Vercel:**
- Go to Settings → Environment Variables
- Add your variables

**Common variables you might need:**
```
NEXT_PUBLIC_SITE_URL=https://hyper-quant.tech
NEXT_PUBLIC_API_URL=your-api-url
```

## Pre-deployment Checklist

- [ ] Test build locally: `npm run build`
- [ ] Check all pages load correctly
- [ ] Verify responsive design
- [ ] Test contact forms
- [ ] Check SEO meta tags
- [ ] Verify SSL certificate
- [ ] Test performance with Lighthouse

## Domain Configuration

### DNS Records for hyper-quant.tech

**For Vercel:**
```
A     @     76.76.19.19
CNAME www   cname.vercel-dns.com
```

**For Cloudflare (if using):**
```
A     @     your-server-ip
CNAME www   hyper-quant.tech
```

## Post-deployment

1. **Test the site**: Visit https://hyper-quant.tech
2. **Setup monitoring**: Consider adding uptime monitoring
3. **Analytics**: Add Google Analytics if needed
4. **SEO**: Submit sitemap to Google Search Console

## Troubleshooting

### Common Issues:
- **404 errors**: Check routing and trailing slashes
- **Images not loading**: Verify image optimization settings
- **Slow loading**: Enable compression and CDN
- **SSL issues**: Ensure certificate is properly configured

### Performance Optimization:
- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Minimize JavaScript bundles