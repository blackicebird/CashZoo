@echo off

set DEPLOY_DIR=%1

IF "%DEPLOY_DIR%" == "" (
    set DEPLOY_DIR="deploy"
)

compass compile resources --config resources/sass/config.rb --sass-dir sass --css-dir css --boring --quiet
cd fashion
generate-chart-themes.bat
cd ..
jsbuilder\JSBuilder.bat --projectFile %CD%\touch-charts.jsb3 --deployDir %DEPLOY_DIR% --verbose"

