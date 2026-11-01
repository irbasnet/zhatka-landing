@echo off
setlocal enabledelayedexpansion

rem Builds the React client and the .NET API, then zips the result into
rem deploy.zip - ready to upload via SmarterASP.NET's "Upload A Zip File"
rem deployment method (or any host that takes a zipped site).
rem
rem appsettings.Production.json and appsettings.Development.json are left
rem out of the package on purpose: production secrets (DB connection
rem string, admin password) should be set once directly on the server via
rem the control panel's file manager and never overwritten by a
rem redeploy. See appsettings.Production.json.example for the shape it
rem needs.
rem
rem Usage: package.bat

set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"
set "PUBLISH_DIR=%ROOT%\publish"
set "ZIP_PATH=%ROOT%\deploy.zip"

echo === Building React client ===
pushd "%ROOT%\client"
call npm install
if errorlevel 1 goto :error
call npm run build
if errorlevel 1 goto :error
popd

echo === Copying client build into wwwroot ===
set "WWWROOT=%ROOT%\server\Zhatka.Api\wwwroot"
if exist "%WWWROOT%" rd /s /q "%WWWROOT%"
mkdir "%WWWROOT%"
xcopy "%ROOT%\client\dist\*" "%WWWROOT%\" /E /I /Y >nul
if errorlevel 1 goto :error

echo === Publishing .NET API (Release) ===
if exist "%PUBLISH_DIR%" rd /s /q "%PUBLISH_DIR%"
dotnet publish "%ROOT%\server\Zhatka.Api\Zhatka.Api.csproj" -c Release -o "%PUBLISH_DIR%"
if errorlevel 1 goto :error

echo === Excluding settings files from the package ===
del /q "%PUBLISH_DIR%\appsettings.Production.json" 2>nul
del /q "%PUBLISH_DIR%\appsettings.Development.json" 2>nul

echo === Zipping publish output to deploy.zip ===
if exist "%ZIP_PATH%" del /q "%ZIP_PATH%"
powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Path '%PUBLISH_DIR%\*' -DestinationPath '%ZIP_PATH%' -Force"
if errorlevel 1 goto :error

echo.
echo Done: %ZIP_PATH%
echo Upload it via SmarterASP.NET's "Upload A Zip File" deployment method.
echo Make sure appsettings.Production.json already exists on the server
echo (real DB connection string + admin password) - see
echo server\Zhatka.Api\appsettings.Production.json.example for the shape.
exit /b 0

:error
echo.
echo Package build failed.
exit /b 1
