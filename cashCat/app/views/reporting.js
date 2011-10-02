/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-10-2
 * Time: 上午11:10
 * Email: mail.lgq@gmail.com
 */

cashCat.views.Reporting = Ext.extend(Ext.Panel, {
    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: msg.prop('Reporting')
                }
            ]
        });

        cashCat.views.Reporting.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('cashCatReporting', cashCat.views.Reporting);