/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.button.Cycle
 * @extends Ext.button.Split
 * A specialized SplitButton that contains a menu of {@link Ext.menu.CheckItem} elements.  The button automatically
 * cycles through each menu item on click, raising the button's {@link #change} event (or calling the button's
 * {@link #changeHandler} function, if supplied) for the active menu item. Clicking on the arrow section of the
 * button displays the dropdown menu just like a normal SplitButton.
 * {@img Ext.button.Cycle/Ext.button.Cycle.png Ext.button.Cycle component}
 * Example usage:
 * <pre><code>
Ext.create('Ext.button.Cycle', {
    showText: true,
    prependText: 'View as ',
    renderTo: Ext.getBody(),
    menu: {
        id: 'view-type-menu',
        items: [{
            text:'text only',
            iconCls:'view-text',
            checked:true
        },{
            text:'HTML',
            iconCls:'view-html'
        }]
    },
    changeHandler:function(cycleBtn, activeItem){
        Ext.Msg.alert('Change View', activeItem.text);
    }
});
</code></pre>
 */
Ext.define('Ext.button.Cycle', {

    /* Begin Definitions */

    alias: 'widget.cycle',

    extend: 'Ext.button.Split',
    alternateClassName: 'Ext.CycleButton',

    /* End Definitions */

    /**
     * @cfg {Object[]} items <p>Deprecated as of 4.0. Use the {@link #menu} config instead. All menu items will be created
     * as {@link Ext.menu.CheckItem CheckItem}s.</p>
     * <p>An array of {@link Ext.menu.CheckItem} <b>config</b> objects to be used when creating the
     * button's menu items (e.g., {text:'Foo', iconCls:'foo-icon'})
     */
    /**
     * @cfg {Boolean} showText True to display the active item's text as the button text (defaults to false).
     * The Button will show its configured {@link #text} if this. config is omitted.
     */
    /**
     * @cfg {String} prependText A static string to prepend before the active item's text when displayed as the
     * button's text (only applies when showText = true, defaults to '')
     */
    /**
     * @cfg {Function} changeHandler A callback function that will be invoked each time the active menu
     * item in the button's menu has changed.  If this callback is not supplied, the SplitButton will instead
     * fire the {@link #change} event on active item change.  The changeHandler function will be called with the
     * following argument list: (SplitButton this, Ext.menu.CheckItem item)
     */
    /**
     * @cfg {String} forceIcon A css class which sets an image to be used as the static icon for this button.  This
     * icon will always be displayed regardless of which item is selected in the dropdown list.  This overrides the
     * default behavior of changing the button's icon to match the selected item's icon on change.
     */
    /**
     * @property {Ext.menu.Menu} menu
     * The {@link Ext.menu.Menu Menu} object used to display the {@link Ext.menu.CheckItem CheckItems} representing the available choices.
     */

    // private
    getButtonText: function(item) {
        var me = this,
            text = '';

        if (item && me.showText === true) {
            if (me.prependText) {
                text += me.prependText;
            }
            text += item.text;
            return text;
        }
        return me.text;
    },

    /**
     * Sets the button's active menu item.
     * @param {Ext.menu.CheckItem} item The item to activate
     * @param {Boolean} suppressEvent True to prevent the button's change event from firing (defaults to false)
     */
    setActiveItem: function(item, suppressEvent) {
        var me = this;

        if (!Ext.isObject(item)) {
            item = me.menu.getComponent(item);
        }
        if (item) {
            if (!me.rendered) {
                me.text = me.getButtonText(item);
                me.iconCls = item.iconCls;
            } else {
                me.setText(me.getButtonText(item));
                me.setIconCls(item.iconCls);
            }
            me.activeItem = item;
            if (!item.checked) {
                item.setChecked(true, false);
            }
            if (me.forceIcon) {
                me.setIconCls(me.forceIcon);
            }
            if (!suppressEvent) {
                me.fireEvent('change', me, item);
            }
        }
    },

    /**
     * Gets the currently active menu item.
     * @return {Ext.menu.CheckItem} The active item
     */
    getActiveItem: function() {
        return this.activeItem;
    },

    // private
    initComponent: function() {
        var me = this,
            checked = 0,
            items;

        me.addEvents(
            /**
             * @event change
             * Fires after the button's active menu item has changed.  Note that if a {@link #changeHandler} function
             * is set on this CycleButton, it will be called instead on active item change and this change event will
             * not be fired.
             * @param {Ext.button.Cycle} this
             * @param {Ext.menu.CheckItem} item The menu item that was selected
             */
            "change"
        );

        if (me.changeHandler) {
            me.on('change', me.changeHandler, me.scope || me);
            delete me.changeHandler;
        }

        // Allow them to specify a menu config which is a standard Button config.
        // Remove direct use of "items" in 5.0.
        items = (me.menu.items||[]).concat(me.items||[]);
        me.menu = Ext.applyIf({
            cls: Ext.baseCSSPrefix + 'cycle-menu',
            items: []
        }, me.menu);

        // Convert all items to CheckItems
        Ext.each(items, function(item, i) {
            item = Ext.applyIf({
                group: me.id,
                itemIndex: i,
                checkHandler: me.checkHandler,
                scope: me,
                checked: item.checked || false
            }, item);
            me.menu.items.push(item);
            if (item.checked) {
                checked = i;
            }
        });
        me.itemCount = me.menu.items.length;
        me.callParent(arguments);
        me.on('click', me.toggleSelected, me);
        me.setActiveItem(checked, me);

        // If configured with a fixed width, the cycling will center a different child item's text each click. Prevent this.
        if (me.width && me.showText) {
            me.addCls(Ext.baseCSSPrefix + 'cycle-fixed-width');
        }
    },

    // private
    checkHandler: function(item, pressed) {
        if (pressed) {
            this.setActiveItem(item);
        }
    },

    /**
     * This is normally called internally on button click, but can be called externally to advance the button's
     * active item programmatically to the next one in the menu.  If the current item is the last one in the menu
     * the active item will be set to the first item in the menu.
     */
    toggleSelected: function() {
        var me = this,
            m = me.menu,
            checkItem;

        checkItem = me.activeItem.next(':not([disabled])') || m.items.getAt(0);
        checkItem.setChecked(true);
    }
});
