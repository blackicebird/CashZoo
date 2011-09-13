/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
(function() {
    Ext.regModel('Topic', {
        fields: [
            {name: 'title', mapping: 'topic_title'},
            {name: 'topicId', mapping: 'topic_id'},
            {name: 'author', mapping: 'author'},
            {name: 'lastPost', mapping: 'post_time', type: 'date', dateFormat: 'timestamp'},
            {name: 'excerpt', mapping: 'post_text'}
        ],
        idProperty: 'topicId'
    });
    
    var ds = new Ext.data.Store({
        storeId: 'forumStore',
        autoLoad: true,
        model: 'Topic',
        proxy: {
            type: 'scripttag',
            url: 'http://sencha.com/forum/topics-remote.php',
            reader: {
                type: 'json',
                root: 'topics',
                totalProperty: 'totalCount'
            }
        }
    });

})();

