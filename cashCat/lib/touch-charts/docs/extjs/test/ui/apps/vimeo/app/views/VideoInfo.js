/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Vimeo.VideoInfo
 * @extends Ext.panel.Panel
 * Description
 */
Ext.define("Vimeo.VideoInfo", {
    extend: 'Ext.panel.Panel',
    alias: 'widget.videoinfo',
    
    title: 'Info',

    renderTpl: new Ext.XTemplate(
        '<div class="{baseCls}-wrap">',
            '<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
                '<dl>',
                    '<dt>By:</dt>',
                    '<dd><a href="{video.user_url}" target="_blank">{video.user_name}</a></dd>',
                    '<dt>Length:</dt>',
                    '<dd>{[this.duration(values.video.duration)]}</dd>',
                    '<dt>Likes:</dt>',
                    '<dd>{video.stats_number_of_likes}</dd>',
                    '<dt>Plays:</dt>',
                    '<dd>{video.stats_number_of_plays}</dd>',
                    '<dt>Added:</dt>',
                    '<dd>{video.upload_date:date("d/m/Y")}</dd>',
                '</dl>',
            '</div>',
        '</div>',
        {
            duration: function(duration) {
                var minutes = Math.floor(duration / 60),
                    seconds = duration - (60 * minutes);
                
                return minutes + ":" + seconds;
            }
        }
    ),
    
    initComponent: function() {
        Ext.applyIf(this, {
            renderData: {}
        });
        
        Ext.applyIf(this.renderData, {
            video: this.video.data
        });
        
        Vimeo.VideoInfo.superclass.initComponent.apply(this, arguments);
    }
});

