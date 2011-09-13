/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.form.field.Hidden", function() {
    var component, makeComponent, render;

    beforeEach(function() {
        makeComponent = function(config) {
            config = config || {};
            component = new Ext.form.field.Hidden(config);
        };
    });

    afterEach(function() {
        if (component) {
            component.destroy();
        }
        component = makeComponent = null;
    });


    it("should be registered with the 'hiddenfield' xtype", function() {
        var component = Ext.create("Ext.form.field.Hidden", {name: 'test'});
        expect(component instanceof Ext.form.field.Hidden).toBe(true);
        expect(Ext.getClass(component).xtype).toBe("hiddenfield");
    });

    
    it("should render as input hidden", function(){
        makeComponent({
            name: 'test',
            renderTo: Ext.getBody()
        });    
        expect(component.inputEl.dom.type).toEqual('hidden');
    });

    describe('getSubmitData', function() {
        it("should return the field's value", function() {
            makeComponent({name: 'myname', value: 'myvalue'});
            expect(component.getSubmitData()).toEqual({myname: 'myvalue'});
        });
        it("should return empty string for an empty value", function() {
            makeComponent({name: 'myname', value: ''});
            expect(component.getSubmitData()).toEqual({myname: ''});
        });
    });

    describe('getModelData', function() {
        it("should return the field's value", function() {
            makeComponent({name: 'myname', value: 'myvalue'});
            expect(component.getModelData()).toEqual({myname: 'myvalue'});
        });
        it("should return empty string for an empty value", function() {
            makeComponent({name: 'myname', value: ''});
            expect(component.getModelData()).toEqual({myname: ''});
        });
    });
    
});

