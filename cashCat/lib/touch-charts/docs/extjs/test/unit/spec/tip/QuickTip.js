/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.tip.QuickTip", function() {

    var target, tip;

    function createTargetEl(attrString) {
        target = Ext.getBody().insertHtml('beforeEnd', '<a href="#" ' + attrString + '>x</a>', true);
    }

    function mouseoverTarget() {
        jasmine.fireMouseEvent(target, 'mouseover', target.getX(), target.getY());
    }

    function createTip(cfg) {
        tip = new Ext.tip.QuickTip(Ext.apply({}, cfg, {showDelay: 1}));
    }

    afterEach(function() {
        if (target) {
            target.remove();
        }
        if (tip) {
            tip.destroy();
        }
        Ext.ShadowPool.reset();
        Ext.Array.each(Ext.Layer.shims, function(shim) {
           Ext.removeNode(shim.dom); 
        });
        
        Ext.Layer.addStatics({
            shims: []
        });
        Ext.util.TextMetrics.destroy();
    });


    describe("element attributes", function() {
        function setup(attrs) {
            runs(function() {
                createTargetEl(attrs);
                createTip();
                mouseoverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "QuickTip never showed");
        }

        it("should display a tooltip containing the ext:qtip attribute's value", function() {
            setup('data-qtip="tip text"');
            runs(function() {
                expect(tip.body.dom).hasHTML('tip text');
            });
        });

        it("should display the ext:qtitle attribute as the tooltip title", function() {
            setup('data-qtip="tip text" data-qtitle="tip title"');
            runs(function() {
                expect(tip.title).toEqual('tip title');
            });
        });

        it("should use the ext:qwidth attribute as the tooltip width", function() {
            setup('data-qtip="tip text" data-qwidth="234"');
            runs(function() {
                expect(tip.el.getWidth()).toEqual(234);
            });
        });

        it("should add the ext:qclass attribute as a className on the tooltip element", function() {
            setup('data-qtip="tip text" data-qclass="test-class"');
            runs(function() {
                expect(tip.el.hasCls('test-class')).toBeTruthy();
            });
        });

        it("should use the ext:hide attribute as an autoHide switch for the tooltip", function() {
            setup('data-qtip="tip text" data-hide="user"');
            runs(function() {
                expect(tip.autoHide).toBeFalsy();
            });
        });
    });

    describe("register", function() {
        function setup(registerConfig) {
            runs(function() {
                createTargetEl('');
                createTip({maxWidth: 400});
                tip.register(Ext.apply({}, registerConfig || {}, {target: target, text: 'tip text'}));
                mouseoverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "QuickTip never showed");
        }

        it("should use the 'target' parameter as a new target", function() {
            setup();
            // the expectation is just that setup's waitsFor completed
        });

        it("should use the 'text' parameter as the tooltip content", function() {
            setup({text: 'test text'});
            runs(function() {
                expect(tip.body.dom).hasHTML('test text');
            });
        });

        it("should use the 'title' parameter as the tooltip title", function() {
            setup({title: 'tip title'});
            runs(function() {
                expect(tip.title).toEqual('tip title');
            });
        });

        it("should use the 'width' parameter as the tooltip width", function() {
            setup({width: 345});
            runs(function() {
                expect(tip.el.getWidth()).toEqual(345);
            });
        });

        it("should add the 'cls' parameter to the tooltip element's className", function() {
            setup({cls: 'test-class-name'});
            runs(function() {
                expect(tip.el.hasCls('test-class-name')).toBeTruthy();
            });
        });

        it("should use the 'autoHide' parameter as the tooltip's autoHide value", function() {
            setup({autoHide: false});
            runs(function() {
                expect(tip.autoHide).toBeFalsy();
            });
        });

        it("should use the 'dismissDelay' parameter for the tooltip's dismissDelay value", function() {
            setup({dismissDelay: 123});
            runs(function() {
                expect(tip.dismissDelay).toEqual(123);
            });
        });
    });

    describe("unregister", function() {
        it("should unregister the element as a target", function() {
            createTargetEl('');
            createTip();
            var spy = spyOn(tip, 'delayShow');
            tip.register({target: target, text: 'tip text'});
            tip.unregister(target);
            mouseoverTarget();
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe("interceptTitles", function() {
        it("should use the title attribute rather than ext:qtip", function() {
            runs(function() {
                createTargetEl('title="tip text"');
                createTip({interceptTitles: true});
                mouseoverTarget();
            });
            waitsFor(function() {
                return tip.isVisible();
            }, "QuickTip never showed");
            runs(function() {
                expect(tip.body.dom).hasHTML('tip text');
            });
        });
    });

});

