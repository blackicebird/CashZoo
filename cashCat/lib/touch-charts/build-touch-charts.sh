compass compile resources --config resources/sass/config.rb --sass-dir sass --css-dir css --boring --quiet

cd fashion
./generate-chart-themes.sh
cd ../

jsbuilder/JSBuilder.sh --projectFile touch-charts.jsb3 --deployDir ./deploy
