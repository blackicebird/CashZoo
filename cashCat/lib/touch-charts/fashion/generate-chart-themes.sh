#!/bin/bash

###########################################
# This Script creates themes by           #
# applying fashion to each sass file      #
# found in resources/sass/chart-themes.   #
# The name of the file is used as the     #
# class name for the theme. Everything    #
# is dumped in src/chart/theme/Themes.js. #
# You will need a fashion executable to   #
# run this.                               #
############################################

UNAME=`uname`
if [ $UNAME = "Darwin" ]; then
    OS="macosx"
else
    OS="linux"
fi

result=""
for i in $( ls ../resources/sass/chart-themes/ ); do
  #match sass file name
  if [[ $i =~ _(.*)\.scss ]]; then
    name="Ext.chart.theme.${BASH_REMATCH[1]}"
    json=`./fashion_$OS ../resources/sass/chart-themes/$i json`
    result="$result;${name} = ${json};"
  fi
done

echo "$result" > ../src/chart/theme/ThemeList.js
