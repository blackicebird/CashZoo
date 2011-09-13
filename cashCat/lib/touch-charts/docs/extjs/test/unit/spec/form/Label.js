/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.form.Label", function() {
    var component, makeComponent;
    
    beforeEach(function() {
        makeComponent = function(config) {
            config = config || {};
            Ext.apply(config, {
                name: 'test'
            });
            component = new Ext.form.Label(config);
        };
    });
    
    afterEach(function() {
        if (component) {
            component.destroy();
        }
        component = makeComponent = null;
    });
    
    it("should have a label as the element", function(){
        makeComponent({
            renderTo: Ext.getBody()
        });
        
        expect(component.el.dom.tagName.toUpperCase()).toEqual("LABEL");
    });
    
    it("should use the forId attribute", function(){
        makeComponent({
            renderTo: Ext.getBody(),
            forId: "foo"
        });
        
        expect(component.el.dom.htmlFor).toEqual("foo");
    });
    
    it("should encode the text attribute", function(){
        makeComponent({
            text: "<div>foo</div>",
            renderTo: Ext.getBody()
        });
        
        expect(component.el.dom).hasHTML("&lt;div&gt;foo&lt;/div&gt;");
    });
    
    it("should not encode the html attribute", function(){
        makeComponent({
            html: "<div>foo</div>",
            renderTo: Ext.getBody()
        });
        expect(component.el.dom).hasHTML("<div>foo</div>");
    });
    
    it("should support setText when not rendered", function(){
        makeComponent();
        component.setText("foo");
        component.render(Ext.getBody());
        expect(component.el.dom).hasHTML("foo");
        component.destroy();
        
        makeComponent({
            text: "foo"
        });
        component.setText("bar");
        component.render(Ext.getBody());
        expect(component.el.dom).hasHTML("bar");
    });
    
    it("should enforce the encode attribute", function(){
        makeComponent();
        component.setText("<div>bar</div>", false);
        component.render(Ext.getBody());
        expect(component.el.dom).hasHTML("<div>bar</div>");
        
        component.setText("<span>foo</span>");
        expect(component.el.dom).hasHTML("&lt;span&gt;foo&lt;/span&gt;");
        
        component.setText("<span>bar</span>", false);
        expect(component.el.dom).hasHTML("<span>bar</span>");
    });
});

