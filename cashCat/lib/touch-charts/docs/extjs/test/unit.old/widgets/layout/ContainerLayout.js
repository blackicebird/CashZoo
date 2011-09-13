/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Tests Ext.data.Store functionality
 * @author Ed Spencer
 */
(function() {
    var suite  = Ext.test.session.getSuite('Ext.layout.container.ContainerLayout'),
        assert = Y.Assert;
    
    function buildLayout(config) {
        var layout = new Ext.layout.FormLayout(config || {});
        
        //give a mock container
        layout.container = {
            itemCls: 'ctCls'
        };
        
        return layout;
    };
    
    suite.add(new Y.Test.Case({
        name: 'configureItem',
        
        setUp: function() {
            this.layout = new Ext.layout.container.ContainerLayout({
                extraCls: 'myExtraClass'
            });
            
            //mock component object
            this.component = {
                addCls: Ext.emptyFn,
                doLayout: Ext.emptyFn
            };
        },
        
        testAddsExtraCls: function() {
            var layout = this.layout;
            
            var addedClass = "";
            
            //mock component object
            c = {
                addCls: function(cls) {
                    addedClass = cls;
                }
            };
            
            layout.configureItem(c, 0);
            
            assert.areEqual('myExtraClass', addedClass);
        },
        
        testAddsExtraClsToPositionEl: function() {
            var layout = this.layout;
            
            var addedClass = "";
            
            //mock component object
            c = {
                getPositionEl: function() {
                    return posEl;
                }
            };
            
            //mock position el
            posEl = {
                addCls: function(cls) {
                    addedClass = cls;
                }
            };
            
            layout.configureItem(c, 0);
            
            assert.areEqual('myExtraClass', addedClass);
        },
        
        testLaysOutIfForced: function() {
            var laidOut = false;
            
            var layout = this.layout,
                comp   = this.component;
            
            //mock component object
            comp.doLayout = function() {
                laidOut = true;
            };
            
            layout.configureItem(comp, 0);
            
            assert.isFalse(laidOut);
            
            layout.forceLayout = true;
            layout.configureItem(comp, 0);
            
            assert.isTrue(laidOut);
        },
        
        testHidesIfRenderHidden: function() {
            
        }
    }));
})();
