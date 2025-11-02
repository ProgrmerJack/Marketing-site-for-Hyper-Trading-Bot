# Deployment Script for HyperQuant Marketing Site
# Run this script to prepare and deploy your site

Write-Host "🚀 HyperQuant Marketing Site Deployment" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the marketing-site directory." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Run linting
Write-Host "🔍 Running linting..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Linting issues found. Continue anyway? (y/n)" -ForegroundColor Yellow
    $continue = Read-Host
    if ($continue -ne "y") {
        exit 1
    }
}

# Type checking
Write-Host "🔧 Running type check..." -ForegroundColor Yellow
npm run typecheck

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Type checking failed" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "🏗️  Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Push your code to GitHub/GitLab" -ForegroundColor White
Write-Host "2. Connect to Vercel at https://vercel.com" -ForegroundColor White
Write-Host "3. Add your domain 'hyper-quant.tech' in Vercel settings" -ForegroundColor White
Write-Host "4. Update your DNS records as shown in DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your site will be live at: https://hyper-quant.tech" -ForegroundColor Green