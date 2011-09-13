/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.slider.Tip", function() {
    var slider, tip, thumb0, spaceEl,
        createSlider = function(config) {
            tip = new Ext.slider.Tip();
            
            spyOn(tip, "show").andCallThrough();
            spyOn(tip, "update").andCallThrough();
            
            // make enough room to display tip correctly
            spaceEl = Ext.getBody().createChild({});
            spaceEl.setHeight(100);
            slider = new Ext.slider.Single(Ext.apply({
                renderTo: Ext.getBody(),
                name: "test",
                width: 205,
                labelWidth: 0,
                minValue: 0,
                maxValue: 100,
                useTips: false,
                plugins: [tip]
            }, config));

            thumb0 = slider.thumbs[0];
    };

    afterEach(function() {
        if (slider) {
            slider.destroy();
        }
        spaceEl.remove();
        slider = null;
        Ext.util.TextMetrics.destroy();
        Ext.tip.QuickTipManager.destroy();
        Ext.layout.component.field.Field.destroyTip();
        Ext.ShadowPool.reset();
        Ext.Array.each(Ext.Layer.shims, function(shim) {
           Ext.removeNode(shim.dom); 
        });
        
        Ext.Layer.addStatics({
            shims: []
        });
    });

    describe("when thumb is dragged", function() {
            var thumbXY, thumbSize, tipXY, tipSize;
            beforeEach(function() {
                createSlider();
                var xy = thumb0.el.getXY();
                jasmine.fireMouseEvent(thumb0.el, 'mousedown', xy[0], xy[1] + 5);
                jasmine.fireMouseEvent(thumb0.el, 'mousemove', xy[0] + 50, xy[1] + 5);
                tipXY = tip.el.getXY();
                tipSize = tip.el.getSize();
                thumbXY = thumb0.el.getXY();
                thumbSize = thumb0.el.getSize();
                jasmine.fireMouseEvent(thumb0.el, 'mouseup', xy[0] + 50, xy[1] + 5);
            });

            it("should show the tooltip", function() {
                expect(tip.show).toHaveBeenCalled();
            });
            
            it("should show the tooltip", function() {
                expect(tip.update).toHaveBeenCalledWith(tip.getText(thumb0));
            });

            it("should align the tip to t-b?", function() {
                expect(tipXY[0] < thumbXY[0]).toBe(true);
                expect(tipXY[0] + tipSize.width > thumbXY[0] + thumbSize.width).toBe(true);
                expect(tipXY[1] - tip.offsets[1] + tipSize.height).toBe(thumbXY[1]);
            });
            
    });
    
});
