/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.form.field.Display", function() {

    var component,
        makeComponent;

    beforeEach(function() {
        makeComponent = function(config) {
            config = config || {};
            if (!config.name) {
                config.name = 'fieldname';
            }
            if (!config.renderTo) {
                config.renderTo = Ext.getBody();
            }
            component = new Ext.form.field.Display(config);
        };
    });

    afterEach(function() {
        if (component && component.destroy) {
            component.destroy();
            Ext.layout.component.field.Field.destroyTip();
            Ext.Array.each(Ext.Layer.shims, function(shim) {
               Ext.removeNode(shim.dom); 
            });
            
            Ext.Layer.addStatics({
                shims: []
            });
        }
        component = null;
    });



    it("should be registered as xtype 'displayfield'", function() {
        component = Ext.create("Ext.form.field.Display", {name: 'test'});
        expect(component instanceof Ext.form.field.Display).toBe(true);
        expect(Ext.getClass(component).xtype).toBe("displayfield");
    });

    describe("defaults", function() {
        beforeEach(function() {
            makeComponent();
        });

        it("should have a fieldCls of 'x-form-display-field'", function() {
            expect(component.fieldCls).toEqual('x-form-display-field');
        });

        it("should have htmlEncode set to false", function() {
            expect(component.htmlEncode).toBeFalsy();
        });
    });

    describe("rendering", function() {
        // NOTE this doesn't test the label, error icon, etc. just the parts specific to Display.

        beforeEach(function() {
            makeComponent({value: 'foo'});
        });

        describe("bodyEl", function() {
            it("should exist", function() {
                expect(component.bodyEl).toBeDefined();
            });

            it("should be a child of the main component el", function() {
                expect(component.bodyEl.dom.parentNode).toBe(component.el.dom);
            });

            it("should be a div", function() {
                expect(component.bodyEl.dom.tagName.toLowerCase()).toEqual('div');
            });

            it("should have the class 'x-form-item-body'", function() {
                expect(component.bodyEl.hasCls('x-form-item-body')).toBe(true);
            });

            it("should have the id '[id]-bodyEl'", function() {
                expect(component.bodyEl.dom.id).toEqual(component.id + '-bodyEl');
            });
        });

        describe("inputEl", function() {
            it("should exist", function() {
                expect(component.inputEl).toBeDefined();
            });

            it("should be a child of the bodyEl", function() {
                expect(component.inputEl.dom.parentNode).toBe(component.bodyEl.dom);
            });

            it("should be a div", function() {
                expect(component.inputEl.dom.tagName.toLowerCase()).toEqual('div');
            });

            it("should have the 'fieldCls' config as a class", function() {
                expect(component.inputEl.hasCls(component.fieldCls)).toBe(true);
            });

            it("should have the field value as its innerHTML", function() {
                expect(component.inputEl.dom).hasHTML(component.value);
            });
        });
    });

    describe("validation", function() {
        beforeEach(function() {
            makeComponent();
        });

        it("should always return true from the validate method", function() {
            expect(component.validate()).toBe(true);
        });

        it("should always return true from the isValid method", function() {
            expect(component.isValid()).toBe(true);
        });
    });

    describe("value getters", function() {
        describe("getValue", function() {
            it("should return the field's value", function() {
                makeComponent({value: 'the field value'});
                expect(component.getValue()).toEqual('the field value');
            });

            it("should return the same value when htmlEncode is true", function() {
                makeComponent({value: '<p>the field value</p>', htmlEncode: true});
                expect(component.getValue()).toEqual('<p>the field value</p>');
            });
        });
        describe("getRawValue", function() {
            it("should return the field's value", function() {
                makeComponent({value: 'the field value'});
                expect(component.getRawValue()).toEqual('the field value');
            });

            it("should return the same value when htmlEncode is true", function() {
                makeComponent({value: '<p>the field value</p>', htmlEncode: true});
                expect(component.getRawValue()).toEqual('<p>the field value</p>');
            });
        });
        describe("getSubmitData", function() {
            it("should return null", function() {
                makeComponent({value: 'the field value'});
                expect(component.getSubmitData()).toBeNull();
            });
        });
        describe("getModelData", function() {
            it("should return the value", function() {
                makeComponent({value: 'the field value', name: 'myfield'});
                expect(component.getModelData()).toEqual({myfield: 'the field value'});
            });
        });
    });

    describe("setting value", function() {
        describe("setRawValue", function() {
            it("should set the inputEl's innerHTML to the specified value", function() {
                makeComponent({value: 'the field value'});
                component.setRawValue('the new value');
                expect(component.inputEl.dom).hasHTML('the new value');
            });

            it("should not html-encode the value by default", function() {
                makeComponent({value: 'the field value'});
                component.setRawValue('<p>the new value</p>');
                expect(component.inputEl.dom).hasHTML('<p>the new value</p>');
            });

            it("should html-encode the value when htmlEncode config is true", function() {
                makeComponent({value: 'the field value', htmlEncode: true});
                component.setRawValue('<p>the new value</p>');
                expect(component.inputEl.dom).hasHTML('&lt;p&gt;the new value&lt;/p&gt;');
            });
        });

        describe("setValue", function() {
            it("should set the inputEl's innerHTML to the specified value", function() {
                makeComponent({value: 'the field value'});
                component.setValue('the new value');
                expect(component.inputEl.dom).hasHTML('the new value');
            });

            it("should not html-encode the value by default", function() {
                makeComponent({value: 'the field value'});
                component.setValue('<p>the new value</p>');
                expect(component.inputEl.dom).hasHTML('<p>the new value</p>');
            });

            it("should html-encode the value when htmlEncode config is true", function() {
                makeComponent({value: 'the field value', htmlEncode: true});
                component.setValue('<p>the new value</p>');
                expect(component.inputEl.dom).hasHTML('&lt;p&gt;the new value&lt;/p&gt;');
            });
        });

    });

});

