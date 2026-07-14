<#
  Builds the React client, copies it into the API's wwwroot so the .NET
  app serves both the site and the API from one origin, then publishes
  the whole thing to ./publish — ready to upload to SmarterASP.NET.

  Usage: powershell -ExecutionPolicy Bypass -File deploy.ps1
#>
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

Write-Host "==> Building React client..." -ForegroundColor Cyan
Push-Location "$root\client"
npm install
npm run build
Pop-Location

$wwwroot = "$root\server\Zhatka.Api\wwwroot"
Write-Host "==> Copying client build into $wwwroot ..." -ForegroundColor Cyan
if (Test-Path $wwwroot) {
    Remove-Item -Recurse -Force $wwwroot
}
New-Item -ItemType Directory -Force -Path $wwwroot | Out-Null
Copy-Item -Recurse -Force "$root\client\dist\*" $wwwroot

Write-Host "==> Publishing .NET API (Release)..." -ForegroundColor Cyan
$publishDir = "$root\publish"
if (Test-Path $publishDir) {
    Remove-Item -Recurse -Force $publishDir
}
Push-Location "$root\server\Zhatka.Api"
dotnet publish -c Release -o $publishDir
Pop-Location

Write-Host ""
Write-Host "==> Done. Upload the contents of '$publishDir' to SmarterASP.NET." -ForegroundColor Green
Write-Host "    Make sure appsettings.Production.json has your real DB connection string and admin password before uploading." -ForegroundColor Yellow
