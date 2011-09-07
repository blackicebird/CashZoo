Ext.regController("home",{
    index: function() {
        this.indexView = this.render({
            xtype: 'cashCatApp'
        });
    }
});