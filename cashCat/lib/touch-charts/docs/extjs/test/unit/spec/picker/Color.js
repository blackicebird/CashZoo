/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.picker.Color", function() {
    var colorPicker,
        createPicker = function(config) {
            colorPicker = new Ext.picker.Color(Ext.apply({
                renderTo: Ext.getBody()
            }, config));
        };

    beforeEach(function() {
        this.addMatchers({
            toHaveSelected: function(color) {
                return this.actual.el.down('a.color-' + color).hasCls(colorPicker.selectedCls);
            }
        });
    });
    
    afterEach(function() {
        if (colorPicker) {
            colorPicker.destroy();
            colorPicker = null;
        }
    });
    
    describe("initialisation", function() {
        beforeEach(function() {
            createPicker({
                value: "003300"
            });
        });

        it("should select the element corresponding to the initial value", function() {
            expect(colorPicker).toHaveSelected("003300");
        });
        
        it("should set the value", function() {
            expect(colorPicker.value).toBe("003300");
        });
    });

    describe("mouse click", function() {
        beforeEach(function() {
            var a, xy;
            createPicker();
            a = colorPicker.el.down('a.color-339966');
            xy = a.getXY();
            
            jasmine.fireMouseEvent(a, "mousedown", xy[0], xy[1]); 
            jasmine.fireMouseEvent(a, "mouseup", xy[0], xy[1]); 
            jasmine.fireMouseEvent(a, "click", xy[0], xy[1]); 
        });

        it("should select the element corresponding to the initial value", function() {
            expect(colorPicker).toHaveSelected("339966");
        });

        it("should set the value", function() {
            expect(colorPicker.value).toBe("339966");
        });
    });


    describe("select", function() {
        describe("when picker is rendered", function() {
            beforeEach(function() {
                createPicker();
            });
            
            it("should handle color with #", function() {
                colorPicker.select("#339966");

                expect(colorPicker).toHaveSelected("339966");
                expect(colorPicker.value).toBe("339966");
            });
            
            it("should handle color without #", function() {
                colorPicker.select("339966");

                expect(colorPicker).toHaveSelected("339966");
                expect(colorPicker.value).toBe("339966");
            });

            it("should be able to supress event", function() {
                spyOn(colorPicker, "fireEvent");
                colorPicker.select("#339966", true);
                
                expect(colorPicker.fireEvent).not.toHaveBeenCalled();
            });
        });

        describe("when picker isn't rendered", function() {
            beforeEach(function() {
                createPicker({
                    renderTo: undefined
                });
            });
            
            it("should handle color with #", function() {
                colorPicker.select("#339966");

                expect(colorPicker.value).toBe("339966");
            });
            
            it("should handle color without #", function() {
                colorPicker.select("339966");
                
                expect(colorPicker.value).toBe("339966");
            });

            it("should be able to supress event", function() {
                spyOn(colorPicker, "fireEvent");
                colorPicker.select("#339966", true);
                
                expect(colorPicker.fireEvent).not.toHaveBeenCalled();
            });
        });
    });
    
        describe("getValue", function() {
            beforeEach(function() {
                createPicker();
            });
            
            it("should return the value if a value was selected", function() {
                colorPicker.select("339966");

                expect(colorPicker.getValue()).toBe("339966");
            });

            it("should return null if no value was selected", function() {
                expect(colorPicker.getValue()).toBeNull();
            });
        });

});
