@echo off

del ..\src\chart\theme\ThemeList.js

for /f "tokens=1 delims=_." %%a in ( 'dir /b ..\resources\sass\chart-themes\*.scss' ) do (
  echo ; >> ..\src\chart\theme\ThemeList.js
  echo Ext.chart.theme.%%a = >> ..\src\chart\theme\ThemeList.js
  fashion.exe ../resources/sass/chart-themes/_%%a.scss json >> ..\src\chart\theme\ThemeList.js
)

