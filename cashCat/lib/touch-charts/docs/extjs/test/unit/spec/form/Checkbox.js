/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.form.field.Checkbox", function() {
    var component, makeComponent;

    beforeEach(function() {
        makeComponent = function(config) {
            config = config || {};
            Ext.applyIf(config, {
                name: "test",
                renderTo: Ext.getBody()
            });
            component = new Ext.form.field.Checkbox(config);
        };
    });

    afterEach(function() {
        if (component) {
            component.destroy();
            Ext.layout.component.field.Field.destroyTip();
            
            Ext.Array.each(Ext.Layer.shims, function(shim) {
               Ext.removeNode(shim.dom); 
            });
            
            Ext.Layer.addStatics({
                shims: []
            });
        }
        component = makeComponent = null;

    });



    it("should be registered with the 'checkboxfield' xtype", function() {
        component = Ext.create("Ext.form.field.Checkbox", {name: 'test'});
        expect(component instanceof Ext.form.field.Checkbox).toBe(true);
        expect(Ext.getClass(component).xtype).toBe("checkboxfield");
    });


    describe("defaults", function() {
        beforeEach(function() {
            makeComponent();
        });
        it("should have focusCls='x-form-cb-focus'", function() {
            expect(component.focusCls).toEqual('x-form-cb-focus');
        });
        it("should have fieldCls='x-form-field'", function() {
            expect(component.fieldCls).toEqual('x-form-field');
        });
        it("should have checked=false", function() {
            expect(component.checked).toBe(false);
        });
        it("should have inputValue='on'", function() {
            expect(component.inputValue).toEqual('on');
        });
    });


    describe("rendering", function() {
        // NOTE this doesn't test the main label, error icon, etc. just the parts specific to Checkbox.

        describe("bodyEl", function() {
            beforeEach(function() {
                makeComponent({value: 'foo'});
            });

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

            it("should have an aria role of 'presentation'", function() {
                expect(component.bodyEl.dom.getAttribute('role')).toEqual('presentation');
            });
        });

        describe("inputEl (checkbox element)", function() {
            beforeEach(function() {
                makeComponent({value: 'foo'});
            });

            it("should exist", function() {
                expect(component.inputEl).toBeDefined();
            });

            it("should be a child of the bodyEl", function() {
                expect(component.inputEl.dom.parentNode).toBe(component.bodyEl.dom);
            });

            it("should be an input element", function() {
                expect(component.inputEl.dom.tagName.toLowerCase()).toEqual('input');
            });

            it("should have type='checkbox'", function() {
                expect(component.inputEl.dom.tagName.toLowerCase()).toEqual('input');
            });

            it("should have the component's inputId as its id", function() {
                expect(component.inputEl.dom.id).toEqual(component.inputId);
            });

            it("should have the 'fieldCls' config as a class", function() {
                expect(component.inputEl.hasCls(component.fieldCls)).toBe(true);
            });
        });


        describe("box label", function() {
            it("should not be created by default", function() {
                makeComponent({});
                expect(component.bodyEl.child('label')).toBeNull();
            });

            it("should be created if the boxLabel config is defined", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.bodyEl.child('label')).not.toBeNull();
            });

            it("should be stored as a 'boxLabelEl' reference", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.bodyEl.child('label').dom).toBe(component.boxLabelEl.dom);
            });

            it("should have the class 'x-form-cb-label' by default", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.boxLabelEl.hasCls('x-form-cb-label')).toBe(true);
            });

            it("should be given the configured boxLabelCls", function() {
                makeComponent({boxLabel: 'the box label', boxLabelCls: 'my-custom-boxLabelCls'});
                expect(component.boxLabelEl.hasCls('my-custom-boxLabelCls')).toBe(true);
            });

            it("should have a 'for' attribute set to the inputId", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.boxLabelEl.getAttribute('for')).toEqual(component.inputId);
            });

            it("should contain the boxLabel as its inner text node", function() {
                makeComponent({boxLabel: 'the box label'});
                expect(component.boxLabelEl.dom).hasHTML('the box label');
            });

            describe('boxLabelAlign', function() {
                it("should render the label after the checkbox by default", function() {
                    makeComponent({boxLabel: 'the box label'});
                    expect(component.boxLabelEl.prev().dom).toBe(component.inputEl.dom);
                });
                it("should render the label after the checkbox when boxLabelAlign='after'", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'after'});
                    expect(component.boxLabelEl.prev().dom).toBe(component.inputEl.dom);
                });
                it("should give the 'after' label a class of {boxLabelCls}-after", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'after'});
                    expect(component.boxLabelEl.hasCls(component.boxLabelCls + '-after')).toBe(true);
                });
                it("should render the label before the checkbox when boxLabelAlign='before'", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'before'});
                    expect(component.boxLabelEl.next().dom).toBe(component.inputEl.dom);
                });
                it("should give the 'before' label a class of {boxLabelCls}-before", function() {
                    makeComponent({boxLabel: 'the box label', boxLabelAlign: 'before'});
                    expect(component.boxLabelEl.hasCls(component.boxLabelCls + '-before')).toBe(true);
                });
            });
        });
    });

    describe("setting value", function() {

        it("should accept the checked attribute", function(){
            makeComponent({
                checked: true
            });
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent();
            expect(component.getValue()).toBeFalsy();

        });

        it("should allow the value to be set while not rendered", function(){
            makeComponent({
                renderTo: null
            });
            component.setValue(true);
            component.render(Ext.getBody());
            expect(component.getValue()).toBeTruthy();
        });

        it("should support different values for setValue", function(){
            makeComponent();
            component.setValue('true');
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent();
            component.setValue('1');
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent();
            component.setValue('on');
            expect(component.getValue()).toBeTruthy();
            component.destroy();

            makeComponent({
                inputValue: 'foo'
            });
            component.setValue('foo');
            expect(component.getValue()).toBeTruthy();
            component.setValue('bar');
            expect(component.getValue()).toBeFalsy();
        });

        it("should fire the handler, with the correct scope", function(){
            var o1 = {
                fn: function(){}
            }, o2 = {},
            spy = spyOn(o1, 'fn');


            makeComponent({
                handler: o1.fn
            });
            component.setValue(true);
            expect(o1.fn).toHaveBeenCalledWith(component, true);
            expect(spy.calls[0].object).toBe(component);
            component.destroy();

            makeComponent({
                handler: o1.fn,
                scope: o1
            });
            component.setValue(true);
            expect(o1.fn).toHaveBeenCalledWith(component, true);
            expect(spy.calls[1].object).toBe(o1);
            component.destroy();

            makeComponent({
                handler: o1.fn,
                scope: o2
            });
            component.setValue(true);
            expect(o1.fn).toHaveBeenCalledWith(component, true);
            expect(spy.calls[2].object).toBe(o2);
        });

        it("should not fire the handler if the value doesn't change", function() {
            makeComponent({
                handler: function() {}
            });
            spyOn(component, 'handler');
            component.setValue(false);
            expect(component.handler).not.toHaveBeenCalled();
        });
    });

    describe('readOnly', function() {
        it("should set the checkbox to disabled=true", function() {
            makeComponent({
                readOnly: true,
                renderTo: Ext.getBody()
            });
            expect(component.inputEl.dom.disabled).toBe(true);
        });

        describe('setReadOnly method', function() {
            it("should set disabled=true when the arg is true", function() {
                makeComponent({
                    readOnly: false,
                    renderTo: Ext.getBody()
                });
                component.setReadOnly(true);
                expect(component.inputEl.dom.disabled).toBe(true);
            });
            it("should set disabled=false when the arg is false", function() {
                makeComponent({
                    readOnly: true,
                    renderTo: Ext.getBody()
                });
                component.setReadOnly(false);
                expect(component.inputEl.dom.disabled).toBe(false);
            });
            it("should set disabled=true when the arg is false but the component is disabled", function() {
                makeComponent({
                    readOnly: true,
                    disabled: true,
                    renderTo: Ext.getBody()
                });
                component.setReadOnly(false);
                expect(component.inputEl.dom.disabled).toBe(true);
            });
        });
    });

    describe('submit value', function() {
        it("should submit the inputValue when checked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                checked: true
            });
            expect(component.getSubmitData()).toEqual({'cb-name': 'the-input-value'});
        });

        it("should submit nothing when unchecked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                checked: false
            });
            expect(component.getSubmitData()).toBeNull();
        });

        it("should submit the uncheckedValue when unchecked, if defined", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                uncheckedValue: 'the-unchecked-value',
                checked: false
            });
            expect(component.getSubmitData()).toEqual({'cb-name': 'the-unchecked-value'});
        });
    });

    describe('getModelData', function() {
        it("should return true when checked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                checked: true
            });
            expect(component.getModelData()).toEqual({'cb-name': true});
        });

        it("should return false when unchecked", function() {
            makeComponent({
                name: 'cb-name',
                inputValue: 'the-input-value',
                uncheckedValue: 'the-unchecked-value',
                checked: false
            });
            expect(component.getModelData()).toEqual({'cb-name': false});
        });
    });

});

