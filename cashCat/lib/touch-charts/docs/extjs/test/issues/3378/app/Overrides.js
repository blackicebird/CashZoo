/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
//Ext.override( Ext.data.Store,
//{
    //resetData: function()
    //{
        //this.prefetchData.clear();
        //this.removeAll();
        //this.totalCount = 0;
        //this.guaranteedStart = this.guaranteedEnd = undefined;
    //}
//});
//
//Ext.override( Ext.grid.GridPanel,
//{
	//resetScrollers: function()
	//{
		//this.horizontalScroller.firstLoad = undefined;
		//this.verticalScroller.firstLoad = undefined;
		//this.invalidateScroller();
	//}
//} );

//Ext.override( Ext.panel.Table,
//{
//	/**
//     * Request a recalculation of scrollbars and put them in if they are needed.
//     */
//    determineScrollbars: function() {
//        var me = this,
//            viewElDom,
//            centerScrollWidth,
//            centerClientWidth,
//            scrollHeight,
//            clientHeight;
//
//        if (!me.collapsed && me.view && me.view.el && me.view.el.dom) {
//            viewElDom = me.view.el.dom;
//            //centerScrollWidth = viewElDom.scrollWidth;
//            centerScrollWidth = me.headerCt.getFullWidth();
//            /**
//             * clientWidth often returns 0 in IE resulting in an
//             * infinity result, here we use offsetWidth bc there are
//             * no possible scrollbars and we don't care about margins
//             */
//            centerClientWidth = viewElDom.offsetWidth;
//            if (me.verticalScroller && me.verticalScroller.el) {
//                //if the scroller was removed because of hide, we need to assign it back here
//                if( !me.verticalScroller.ownerCt ) {
//                    me.verticalScroller.ownerCt = this;
//                }
//                scrollHeight = me.verticalScroller.getSizeCalculation().height;
//            } else {
//                scrollHeight = viewElDom.scrollHeight;
//            }
//
//            clientHeight = viewElDom.clientHeight;
//
//            if (!me.collapsed && scrollHeight > clientHeight) {
//                me.showVerticalScroller();
//            } else {
//                me.hideVerticalScroller();
//            }
//
//            if (!me.collapsed && centerScrollWidth > (centerClientWidth + Ext.getScrollBarWidth() - 2)) {
//                me.showHorizontalScroller();
//            } else {
//                me.hideHorizontalScroller();
//            }
//        }
//    },
//
//
//    /**
//     * Show the horizontalScroller and add the horizontalScrollerPresentCls.
//     */
//    showHorizontalScroller: function() {
//        var me = this;
//
//        if (me.verticalScroller) {
//            me.verticalScroller.offsets.bottom = Ext.getScrollBarWidth() - 2;
//        }
//
//        //check if it is docked or not because the item may have been removed on hide
//        if (me.horizontalScroller && !me.getDockedComponent( me.horizontalScroller ) )
//        {
//            me.addDocked(me.horizontalScroller);
//            me.addCls(me.horizontalScrollerPresentCls);
//            me.fireEvent('scrollershow', me.horizontalScroller, 'horizontal');
//        }
//    },
//
//
//    /**
//     * Show the verticalScroller and add the verticalScrollerPresentCls.
//     */
//    showVerticalScroller: function() {
//        var me = this,
//            headerCt = me.headerCt;
//
//        // only trigger a layout when reserveOffset is changing
//        if (headerCt && !headerCt.layout.reserveOffset) {
//            headerCt.layout.reserveOffset = true;
//            headerCt.doLayout();
//        }
//
//        //check if it is docked or not because the item may have been removed on hide
//        if ( me.verticalScroller && !me.getDockedComponent( me.verticalScroller ) )
//        {
//            me.addDocked( me.verticalScroller );
//            me.addCls(me.verticalScrollerPresentCls);
//            me.fireEvent('scrollershow', me.verticalScroller, 'vertical');
//        }
//    }
//} );
//
//Ext.override( Ext.grid.PagingScroller,
//{
//	getSizeCalculation: function()
//	{
//	    // Use the direct ownerCt here rather than the scrollerOwner
//	    // because we are calculating widths/heights.
//	    var owner = this.ownerCt,
//            view = owner.getView(),
//            store  = this.store,
//	        dock   = this.dock,
//	        elDom  = this.el.dom,
//	        width  = 1,
//	        height = 1;
//
//	    if (!this.rowHeight)
//	    {
//	        this.rowHeight = view.el.down( view.getItemSelector() ).getHeight( false, true );
//	    }
//
//	    //we need to know if filtered
//	    if( store.isFiltered() )
//	    {
//            //find filtered amount X the rowHeight
//            height = store.data.length * this.rowHeight;
//	    }
//	    else
//	    {
//            height = store.getTotalCount() * this.rowHeight;
//	    }
//
//	    if (isNaN(width)) {
//	        width = 1;
//	    }
//	    if (isNaN(height)) {
//	        height = 1;
//	    }
//	    return {
//	        width: width,
//	        height: height
//	    };
//	}
//} );

/*
 * This Override allows text to be selected within a grid cell
 */
 /*
Ext.override(Ext.view.Table, {
    afterRender: function() {
        var me = this;

        me.callParent();
        me.mon(me.el, {
            scroll: me.fireBodyScroll,
            scope: me
        });
        if (!me.featuresMC &&
            (me.featuresMC.findIndex('ftype', 'unselectable') >= 0)) {
            me.el.unselectable();
        }

        me.attachEventsForFeatures();
    }
});
*/

Ext.define('qcom.grid.SelectFeature', {
    extend: 'Ext.grid.feature.Feature',
    alias: 'feature.selectable',

    mutateMetaRowTpl: function(metaRowTpl) {
        var i,
        ln = metaRowTpl.length;

        for (i = 0; i < ln; i++) {
            tpl = metaRowTpl[i];
            tpl = tpl.replace(/x-grid-row/, 'x-grid-row x-selectable');
            tpl = tpl.replace(/x-grid-cell-inner x-unselectable/g, 'x-grid-cell-inner');
            tpl = tpl.replace(/unselectable="on"/g, '');
            metaRowTpl[i] = tpl;
        }
    }
});

