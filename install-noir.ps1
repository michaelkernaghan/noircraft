# Noir Installation Script for Windows
# This script installs noirup and then uses it to install the latest Noir version

Write-Host "🔧 Installing Noir for Windows..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Download and install noirup
Write-Host "Step 1: Installing noirup (Noir version manager)..." -ForegroundColor Yellow

try {
    # Download the install script
    $installScript = Invoke-WebRequest -Uri "https://raw.githubusercontent.com/noir-lang/noir/master/install.ps1" -UseBasicParsing

    # Execute the script
    Invoke-Expression $installScript.Content

    Write-Host "✅ noirup installed successfully!" -ForegroundColor Green
    Write-Host ""

} catch {
    Write-Host "❌ Failed to install noirup: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please try manual installation:" -ForegroundColor Yellow
    Write-Host "irm https://raw.githubusercontent.com/noir-lang/noir/master/install.ps1 | iex" -ForegroundColor White
    exit 1
}

# Step 2: Add noirup to PATH for current session
Write-Host "Step 2: Setting up environment..." -ForegroundColor Yellow

# The install script adds it to user PATH, but we need it for this session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","User") + ";" + [System.Environment]::GetEnvironmentVariable("Path","Machine")

# Step 3: Install Noir using noirup
Write-Host "Step 3: Installing Noir compiler..." -ForegroundColor Yellow

try {
    # Check if noirup is available
    $noirupPath = Get-Command noirup -ErrorAction SilentlyContinue

    if ($noirupPath) {
        Write-Host "Running: noirup" -ForegroundColor Gray
        & noirup

        Write-Host ""
        Write-Host "✅ Noir installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ noirup not found in PATH." -ForegroundColor Yellow
        Write-Host "Please close and reopen your terminal, then run: noirup" -ForegroundColor White
    }

} catch {
    Write-Host "❌ Failed to install Noir: $_" -ForegroundColor Red
    exit 1
}

# Step 4: Verify installation
Write-Host ""
Write-Host "Step 4: Verifying installation..." -ForegroundColor Yellow

try {
    $nargoPath = Get-Command nargo -ErrorAction SilentlyContinue

    if ($nargoPath) {
        $version = & nargo --version
        Write-Host "✅ $version" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 Installation complete!" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. cd contracts/private_voting_demo" -ForegroundColor White
        Write-Host "2. nargo test" -ForegroundColor White
        Write-Host "3. nargo prove" -ForegroundColor White
    } else {
        Write-Host "⚠️ nargo not found. Please restart your terminal." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "After restarting, verify with: nargo --version" -ForegroundColor White
    }

} catch {
    Write-Host "⚠️ Please restart your terminal to complete installation." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📚 Documentation: https://noir-lang.org/docs" -ForegroundColor Cyan
