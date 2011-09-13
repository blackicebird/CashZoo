EnergyApp.views.Navigation = new Ext.NestedList({
    store: EnergyApp.stores.NavigationStore,
    dock: 'left',
    useTitleAsBackText: false,
    useToolbar: Ext.is.Phone ? false : true,
    title: 'Choose Data',
    displayField: 'label',
    hidden: !Ext.is.Phone && Ext.Viewport.orientation == 'portrait',
    listeners: {
        itemtap: function(subList, subIndex, el, e) {
            var store = subList.getStore(),
                record = store.getAt(subIndex),
                recordNode = record.node,
                parentNode = recordNode ? recordNode.parentNode : null;

            if(Ext.is.Phone){
                // toolbar title change and back button display
                var toolBar = EnergyApp.views.viewport.toolBar;
                toolBar.setTitle(recordNode.attributes.record.data.label);
                toolBar.items.get(0).show();
            }

            if (recordNode.leaf) {
                // query parameters for data loading
                var type = parentNode.attributes.record.data.key,
                    state = recordNode.attributes.record.data.key,
                    chart = EnergyApp.views.ChartView,
                    activeItem = EnergyApp.views.viewport.getActiveItem(),
                    maskEl, loadMask;

                maskEl = (!Ext.is.Phone && activeItem) ? activeItem.el : Ext.getBody();
	            loadMask = new Ext.LoadMask(maskEl, {
	                msg: 'Loading...'
	            });
				loadMask.show();
                Ext.Ajax.request({
                    url: 'app/data/' + type + "_" + state + ".json",
                    success: function(response, opts) {
                        // decode responseText in order to create json object
                        var data = Ext.decode(response.responseText);
                        // load it into the charts store: this will update the area series
                        EnergyApp.stores.ChartStore.loadData(data.items);
                        EnergyApp.loadPieAtYear();
                        // This should only run once? Doesn't seem to be a problem at the moment.
                        EnergyApp.views.viewport.setActiveItem(chart, 'slide');
                        loadMask.destroy();
                    }
                });
            }
        }
    }
});
