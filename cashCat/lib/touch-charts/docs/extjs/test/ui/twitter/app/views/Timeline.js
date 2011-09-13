/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
* @class twitter.views.TimeLine
* @extends Ext.view.View
* 
* A dataview which displays a set of tweets. It has completely custom styling which is defined in the twitter.css file.
*/
Ext.define('twitter.views.Timeline', {
    extend: 'Ext.view.View',
    alias : 'widget.timeline',
    
    // frame : true,
    border: false,
    
    initComponent: function() {
        Ext.apply(this, {
            cls      : 'timeline',
            emptyText: '<p class="no-searches">No tweets found matching that search</p>',

            disableSelection: true,
            
            autoScroll: true,
            border: false,
            // width: 500,
            flex: 50,
            maxWidth: 800,
            
            bodyStyle: 'background:red;',
            
            store       : this.store,
            itemSelector: 'tweet',
            tpl: new Ext.XTemplate(
                    '<table class="tweets-table" cellpadding="0" cellspacing="0" width="100%">',
                        '<tpl for=".">',
                            '<tr class="tweet">',
                                '<td class="image" valign="top"><img ref="{from_user}" src="{profile_image_url:this.profileImageUrl}" /></td>',
                                '<td class="tweet" valign="top">',
                                    '<h2 class="from_user">{from_user}</h2>',
                                    '<p>{text:this.linkify}</p><strong></strong>',
                                    //'<span class="posted">{created_at}</span>',
                                '</td>',
                            '</tr>',
                        '</tpl>',        
                    '</table>',
                {
                    /**
                     * Simply wraps a link tag around each detected url
                     */
                    linkify: function(value) {
                        value = value.replace(/(^|\s)@(\w+)/g, '$1<span class="user">@$2</span>');
                        value = value.replace(/(^|\s)#(\w+)/g, '$1<span class="hash">#$2</span>');
                        value = value.replace(/(http:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
                        
                        return value;
                    },
                    profileImageUrl: function(value) {
                        if (value.match("default_profile_normal.png")) {
                            return "http://a3.twimg.com/sticky/default_profile_images/default_profile_2_reasonably_small.png";
                        }
                        return value;
                    }
                }
            )
        });
        
        this.callParent(arguments);
    },
    
    /**
     * Called when the timeline is clicked. We can then tell what was clicked and decide to delegate or not.
     */
    onContainerClick: function(e) {
        var el = Ext.get(e.getTarget()),
            query;
        
        if (el.hasCls('hash') || el.hasCls('user') || el.hasCls('from_user')) {
            query = el.dom.innerHTML;
        } else {
            var ref = el.dom.getAttribute('ref');
            if (ref) {
                query = ref;
            }
        }
        
        //search if there is a query
        if (query) {
            this.search(query);
        }
    },
    
    /**
     * Called when a hash/user/image is clicked on the timeline.
     * @param {String} query The search query to perform
     */
    search: function(query) {
        var store = Ext.getStore('Searches'),
            index = store.find('query', query, 0, false, false, true),
            instance;
         
        if (index == -1) {
            instance = store.create({query: query});
            store.add(instance);
        } else {
            instance = store.getAt(index);
        }
        
        //dispatch to the controller
        var controller = Ext.ControllerManager.get('searches'),
            query      = controller.sanitizeQuery(instance.get('query'));
        
        Ext.dispatch({
            controller: 'searches',
            action    : 'show',
            instance  : instance,
            historyUrl: 'searches/' + query
        });
    }
});

