/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
function StopWatch(){

var startTime = null;
var stopTime = null;
var running = false;

this.start = function(){
    
    if (running == true)
        return;
    else if (startTime != null)
        stopTime = null;
    
    running = true;    
    startTime = getTime();
}

this.stop = function(){
    
    if (running == false)
        return;    
    
    stopTime = getTime();
    running = false;
}

this.duration = function(){
    if (startTime == null || stopTime == null)
        return 'Undefined';
    else
        return (stopTime - startTime) / 1000;
}

this.isRunning = function() { return running; }

function getTime(){
    var day = new Date();
    return day.getTime();
}


}

