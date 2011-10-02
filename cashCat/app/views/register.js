/**
 * Copyright (c) Li Guoqiang
 * Author: Leon Lee
 * Date: 11-10-2
 * Time: 上午10:18
 * Email: mail.lgq@gmail.com
 */
cashCat.views.Register = Ext.extend(Ext.Panel, {
    html: 'Register panel',
    initComponent: function() {
        Ext.apply(this, {
           dockedItems:[
               {
                   dock: 'top',
                   xtype: 'toolbar',
                   title: msg.prop('Register')
               }
           ]
        });

        cashCat.views.Register.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('cashCatRegister', cashCat.views.Register);