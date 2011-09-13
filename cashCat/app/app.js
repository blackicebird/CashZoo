Ext.debug = true;
Ext.regApplication(({
    name: 'cashCat',
    launch: function() {
        var reportService = cashCat.services.reportService;

        var topExpenseData = reportService.analyseTopExpense(5);
        var monthData = reportService.analyseMonthly(new Date());
        var accountData = reportService.analyseAccount(new Date());

        this.viewport = new cashCat.views.Viewport({
            topExpenseData: topExpenseData,
            monthData: monthData,
            accountData: accountData
        });
        this.viewport.on('beforecardswitch', this.onTabChange);

        cashCat.mq.addListener('back', function(prev) {
            Ext.getCmp('viewport').setActiveItem(this.prevCard, {
                type: 'slide',
                reverse: true,
                scope: this
            });

        });

        this.onViewportActivate();
    },
    onViewportActivate: function() {
        Ext.dispatch({
            controller: "home",
            action: "index",
            historyUrl: 'dashboard'
        });
    },
    onTabChange: function(panel, newCard, oldCard, index, animated) {
        switch (newCard.xtype) {
            case 'cashCatHome':
                Ext.dispatch({
                    controller: "home",
                    action    : "refresh",
                    historyUrl: "home/refresh"
                });
                break;
            case 'cashCatAccount':
                Ext.dispatch({
                    controller: "account",
                    action: "index",
                    historyUrl: "home/refresh"
                });
                break;
            default:
        }
    }
}));

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

cashCat.dbName = "CashCat";
cashCat.mq = new cashCat.MessageQueue({
    topics: [
        'back'
    ]
});