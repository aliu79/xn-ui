# PowerShell deployment script for Windows

Write-Host "Starting build..." -ForegroundColor Green

# Build with DEPLOY_ENV environment variable for correct publicPath
npm run build:deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Build successful, starting deployment..." -ForegroundColor Green

# Navigate to build output directory
Set-Location dist

# Initialize git repository
git init
git add -A
git commit -m "deploy"

Write-Host "Pushing to GitHub Pages..." -ForegroundColor Green

# Deploy to https://aliu79.github.io/xn-ui
git push -f https://github.com/aliu79/xn-ui.git master:gh-pages

# Return to parent directory
Set-Location ..

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Visit: https://aliu79.github.io/xn-ui/" -ForegroundColor Cyan
