/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.form.field.Time", function() {
    var component, makeComponent;

    beforeEach(function() {
        makeComponent = function(config) {
            config = config || {};
            Ext.applyIf(config, {
                name: 'test',
                width: 100
            });
            component = new Ext.form.field.Time(config);
        };

        this.addMatchers({
            toEqualTime: function(hour, minute, second, ms) {
                var actual = this.actual;
                return actual instanceof Date &&
                       actual.getHours() === hour &&
                       actual.getMinutes() === (minute || 0) &&
                       actual.getSeconds() === (second || 0) &&
                       actual.getMilliseconds() === (ms || 0);
            }
        });
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

    function clickTrigger() {
        var trigger = component.triggerEl.first(),
            xy = trigger.getXY();
        jasmine.fireMouseEvent(trigger.dom, 'click', xy[0], xy[1]);
    }



    it("should be registered with xtype 'timefield'", function() {
        component = Ext.create("Ext.form.field.Time", {name: 'test'});
        expect(component instanceof Ext.form.field.Time).toBe(true);
        expect(Ext.getClass(component).xtype).toBe("timefield");
    });


    describe("defaults", function() {
        beforeEach(function() {
            makeComponent();
        });
        it("should have triggerCls = 'x-form-time-trigger'", function() {
            expect(component.triggerCls).toEqual('x-form-time-trigger');
        });
        it("should have minValue = undefined", function() {
            expect(component.minValue).not.toBeDefined();
        });
        it("should have maxValue = undefined", function() {
            expect(component.maxValue).not.toBeDefined();
        });
        it("should have minText = 'The time in this field must be equal to or after {0}'", function() {
            expect(component.minText).toEqual('The time in this field must be equal to or after {0}');
        });
        it("should have maxText = 'The time in this field must be equal to or before {0}'", function() {
            expect(component.maxText).toEqual('The time in this field must be equal to or before {0}');
        });
        it("should have invalidText = '{0} is not a valid time'", function() {
            expect(component.invalidText).toEqual('{0} is not a valid time');
        });
        it("should have format = 'g:i A'", function() {
            expect(component.format).toEqual('g:i A');
        });
        it("should have altFormats = 'g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H|gi a|hi a|giA|hiA|gi A|hi A'", function() {
            expect(component.altFormats).toEqual('g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H|gi a|hi a|giA|hiA|gi A|hi A');
        });
        it("should have increment = 15", function() {
            expect(component.increment).toEqual(15);
        });
    });


    describe("rendering", function() {
        // Mostly handled by Trigger and Picker tests

        beforeEach(function() {
            makeComponent({
                renderTo: Ext.getBody()
            });
        });

        it("should give the trigger a class of 'x-form-time-trigger'", function() {
            expect(component.triggerEl.first().hasCls('x-form-time-trigger')).toBe(true);
        });
    });


    describe("trigger", function() {
        beforeEach(function() {
            makeComponent({
                renderTo: Ext.getBody()
            });
            clickTrigger();
        });
        it("should open a Ext.picker.Time", function() {
            expect(component.picker instanceof Ext.picker.Time).toBe(true);
            expect(component.picker.hidden).toBe(false);
        });
        it("should clear the highlighted item from the picker when custom text is entered", function() {
            waits(1);
            runs(function() {
                jasmine.fireMouseEvent(component.picker.getNode(0), 'mouseover');
                expect(component.picker.highlightedItem).toBeDefined();
                component.setValue('1');
                expect(component.picker.highlightedItem).toBeUndefined();                
            });
        });
    });


    describe("setting values", function() {
        describe("parsing", function(){
            it("should parse a string value using the format config", function() {
                makeComponent({
                    format: 'g:iA',
                    value: '8:32PM'
                });
                expect(component.getValue()).toEqualTime(20, 32);
            });

            it("should parse a string value using the altFormats config", function() {
                makeComponent({
                    format: 'g:i.A',
                    altFormats: 'g.i a',
                    value: '8.32 pm'
                });
                expect(component.getValue()).toEqualTime(20, 32);
            });
        });

        describe("setValue", function(){
            it("should accept a date object", function(){
                makeComponent();
                component.setValue(new Date(2010, 10, 5, 9, 46));
                expect(component.getValue()).toEqualTime(9, 46);
            });

            it("should accept a string value", function(){
                makeComponent();
                component.setValue('9:46 AM');
                expect(component.getValue()).toEqualTime(9, 46);
            });

            it("should accept a null value", function(){
                makeComponent();
                component.setValue(null);
                expect(component.getValue()).toBeNull();
            });

            it("should set null if an invalid time string is passed", function(){
                makeComponent();
                component.setValue('6:::37');
                expect(component.getValue()).toBeNull();
            });

        });
    });
    
    describe("submit value", function(){
        it("should use the format as the default", function(){
            makeComponent({
                value: new Date(2010, 0, 15, 7, 30)
            });
            expect(component.getSubmitValue()).toBe('7:30 AM');
        });
        
        it("should give precedence to submitFormat", function(){
            makeComponent({
                value: new Date(2010, 0, 15, 15, 45),
                submitFormat: 'H:i'
            });
            expect(component.getSubmitValue()).toBe('15:45');
        });
        
        it("should still return null if the value isn't a valid date", function(){
            makeComponent({
                value: 'wontparse',
                submitFormat: 'H:i'
            });
            expect(component.getSubmitValue()).toBeNull();
        });
    });

    describe("getModelData", function(){
        it("should use the format as the default", function(){
            makeComponent({
                name: 'myname',
                value: new Date(2010, 0, 15, 15, 45)
            });
            var modelData = component.getModelData();
            expect(modelData.myname).toEqualTime(15, 45);
        });

        it("should return null if the value isn't a valid date", function(){
            makeComponent({
                name: 'myname',
                value: 'wontparse',
                submitFormat: 'H:i'
            });
            expect(component.getModelData()).toEqual({myname: null});
        });
    });


    describe("minValue", function() {
        describe("minValue config", function() {
            it("should allow a string, parsed according to the format config", function() {
                makeComponent({
                    format: 'g:i.A',
                    minValue: '8:30.AM'
                });
                expect(component.minValue).toEqualTime(8,30);
            });

            it("should allow times after it to pass validation", function() {
                makeComponent({
                    minValue: '8:45 AM',
                    value: '9:15 AM'
                });
                expect(component.getErrors().length).toEqual(0);
            });

            it("should cause times before it to fail validation", function() {
                makeComponent({
                    minValue: '10:45 AM',
                    value: '9:15 AM'
                });
                expect(component.getErrors().length).toEqual(1);
                expect(component.getErrors()[0]).toEqual('The time in this field must be equal to or after 10:45 AM');
            });

            it("should fall back to 12AM if the string cannot be parsed", function() {
                makeComponent({
                    minValue: 'foopy',
                    value: '12:00 AM'
                });
                expect(component.getErrors().length).toEqual(0);
            });

            it("should allow a Date object", function() {
                makeComponent({
                    minValue: new Date(2010, 1, 1, 8, 30)
                });
                expect(component.minValue).toEqualTime(8,30);
            });

            it("should be passed to the time picker object", function() {
                makeComponent({
                    minValue: '8:45 AM'
                });
                component.expand();
                expect(component.getPicker().minValue).toEqualTime(8, 45);
            });
        });

        describe("setMinValue method", function() {
            it("should allow a string, parsed according to the format config", function() {
                makeComponent({
                    format: 'g:i A'
                });
                component.setMinValue('1:15 PM');
                expect(component.minValue).toEqualTime(13, 15);
            });

            it("should allow times after it to pass validation", function() {
                makeComponent({
                    value: '9:15 AM'
                });
                component.setMinValue('7:45 AM');
                expect(component.getErrors().length).toEqual(0);
            });

            it("should cause times before it to fail validation", function() {
                makeComponent({
                    value: '9:15 AM'
                });
                component.setMinValue('10:45 AM');
                expect(component.getErrors().length).toEqual(1);
                expect(component.getErrors()[0]).toEqual('The time in this field must be equal to or after 10:45 AM');
            });

            it("should fall back to 12AM if the string cannot be parsed", function() {
                makeComponent({
                    value: '12:00 AM'
                });
                component.setMinValue('foopy');
                expect(component.getErrors().length).toEqual(0);
            });

            it("should allow a Date object", function() {
                makeComponent();
                component.setMinValue(new Date(2010, 1, 1, 8, 30));
                expect(component.minValue).toEqualTime(8,30);
            });

            it("should call the time picker's setMinValue method", function() {
                makeComponent();
                component.expand();
                var spy = spyOn(component.getPicker(), 'setMinValue');
                component.setMinValue('11:15 AM');
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toEqualTime(11, 15);
            });
        });
    });

    describe("maxValue", function() {
        describe("maxValue config", function() {
            it("should allow a string, parsed according to the format config", function() {
                makeComponent({
                    format: 'g:i.A',
                    maxValue: '8:30.PM'
                });
                expect(component.maxValue).toEqualTime(20,30);
            });

            it("should allow times before it to pass validation", function() {
                makeComponent({
                    maxValue: '8:45 PM',
                    value: '7:15 PM'
                });
                expect(component.getErrors().length).toEqual(0);
            });

            it("should cause times after it to fail validation", function() {
                makeComponent({
                    maxValue: '8:45 PM',
                    value: '9:15 PM'
                });
                expect(component.getErrors().length).toEqual(1);
                expect(component.getErrors()[0]).toEqual('The time in this field must be equal to or before 8:45 PM');
            });

            it("should fall back to the end of the day if the string cannot be parsed", function() {
                makeComponent({
                    maxValue: 'foopy',
                    value: '11:59 PM'
                });
                expect(component.getErrors().length).toEqual(0);
            });

            it("should allow a Date object", function() {
                makeComponent({
                    maxValue: new Date(2010, 1, 1, 20, 30)
                });
                expect(component.maxValue).toEqualTime(20, 30);
            });

            it("should be passed to the time picker object", function() {
                makeComponent({
                    maxValue: '8:45 PM'
                });
                component.expand();
                expect(component.getPicker().maxValue).toEqualTime(20, 45);
            });
        });

        describe("setMaxValue method", function() {
            it("should allow a string, parsed according to the format config", function() {
                makeComponent({
                    format: 'g:i A'
                });
                component.setMaxValue('1:15 PM');
                expect(component.maxValue).toEqualTime(13, 15);
            });

            it("should allow times before it to pass validation", function() {
                makeComponent({
                    value: '5:15 PM'
                });
                component.setMaxValue('7:45 PM');
                expect(component.getErrors().length).toEqual(0);
            });

            it("should cause times after it to fail validation", function() {
                makeComponent({
                    value: '9:15 PM'
                });
                component.setMaxValue('7:45 PM');
                expect(component.getErrors().length).toEqual(1);
                expect(component.getErrors()[0]).toEqual('The time in this field must be equal to or before 7:45 PM');
            });

            it("should fall back to the end of the day if the string cannot be parsed", function() {
                makeComponent({
                    value: '11:59 PM'
                });
                component.setMaxValue('foopy');
                expect(component.getErrors().length).toEqual(0);
            });

            it("should allow a Date object", function() {
                makeComponent();
                component.setMaxValue(new Date(2010, 1, 1, 20, 30));
                expect(component.maxValue).toEqualTime(20, 30);
            });

            it("should call the time picker's setMaxValue method", function() {
                makeComponent();
                component.expand();
                var spy = spyOn(component.getPicker(), 'setMaxValue');
                component.setMaxValue('11:15 PM');
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toEqualTime(23, 15);
            });
        });
    });


});

