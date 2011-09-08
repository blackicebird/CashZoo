Ext.regApplication(({
    name: 'cashCat',
    launch: function() {
        Ext.dispatch({
            controller: 'home',
            action: 'index'
        });
    }
}));

cashCat.dbName = "CashCat";

cashCat.MessageQueue = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        this.topics = config.topics;
        if (this.topics) {
            for (var i = 0, ln = this.topics.length; i < ln; i++) {
                this.addEvents(this.topics[i]);
            }
        }
        cashCat.MessageQueue.superclass.constructor.call(this, config);
    }
});

cashCat.mq = new cashCat.MessageQueue({
    topics: [
        'back'
    ]
});