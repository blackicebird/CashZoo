/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.define('Tasks.view.TaskGrid', {
   alias: 'widget.view.taskgrid',
   extend: 'Ext.Panel',

   // title: 'Tasks',
   // flex: 1,
   // margins: '3 3 3 0',
   
   initComponent: function() {
       this.columns = [{
           text: 'Task',
           flex: 1,
           dataIndex: 'task'
       }, {
           text: 'List',
           width: 100,
           dataIndex: 'list'
       }, {
           text: 'Due Date',
           width: 100,
           dataIndex: 'duedate'
       }];
       
       this.callParent(arguments);
   } 
});
