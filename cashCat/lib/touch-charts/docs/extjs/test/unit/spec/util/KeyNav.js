/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
describe("Ext.util.KeyNav", function(){
    var el, nav, createNav, fireKey, defaultFn, KEYS = Ext.util.KeyNav.keyOptions;
    
    beforeEach(function(){
        el = Ext.getBody().dom.ownerDocument.createElement('div');
        el.id = 'test-keyNav-el';
        Ext.getBody().dom.appendChild(el);
        
        createNav = function(config){
            nav = new Ext.KeyNav(el, config);
        };
        
        fireKey = function(key, eventName, options){
            jasmine.fireKeyEvent(el, nav.getKeyEvent(), key);
        };
        
        defaultFn = jasmine.createSpy('defaultKeyNavHandler');
    });
    
    afterEach(function(){
        if (nav) {
            nav.disable();
        }
        
        if (el) {
            Ext.getBody().dom.removeChild(el);
        }
        fireKey = el = nav = createNav = defaultFn = null;
    });
    
    describe("keys", function(){
        describe("key options", function(){
            it("should fire for the left key", function(){
                createNav({
                    left: defaultFn
                });    
                fireKey(KEYS.left);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the right key", function(){
                createNav({
                    right: defaultFn
                });    
                fireKey(KEYS.right);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the up key", function(){
                createNav({
                    up: defaultFn
                });    
                fireKey(KEYS.up);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the down key", function(){
                createNav({
                    down: defaultFn
                });    
                fireKey(KEYS.down);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the pageUp key", function(){
                createNav({
                    pageUp: defaultFn
                });    
                fireKey(KEYS.pageUp);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the pageDown key", function(){
                createNav({
                    pageDown: defaultFn
                });    
                fireKey(KEYS.pageDown);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the del key", function(){
                createNav({
                    del: defaultFn
                });    
                fireKey(KEYS.del);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the home key", function(){
                createNav({
                    home: defaultFn
                });    
                fireKey(KEYS.home);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the end key", function(){
                createNav({
                    end: defaultFn
                });    
                fireKey(KEYS.end);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the enter key", function(){
                createNav({
                    enter: defaultFn
                });    
                fireKey(KEYS.enter);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the esc key", function(){
                createNav({
                    esc: defaultFn
                });    
                fireKey(KEYS.esc);
                expect(defaultFn).toHaveBeenCalled();
            });
        
            it("should fire for the tab key", function(){
                createNav({
                    tab: defaultFn
                });    
                fireKey(KEYS.tab);
                expect(defaultFn).toHaveBeenCalled();
            });
        });
        
        it("should bind multiple keys at once", function(){
            createNav({
                left: defaultFn,
                right: defaultFn
            });
            fireKey(KEYS.left);
            fireKey(KEYS.right);
            expect(defaultFn.callCount).toEqual(2);
        });
    });
    
    describe("scope/params", function(){
        it("should default the scope to the nav", function(){
            var actual;
            createNav({
                left: function(){
                    actual = this;
                }
            });
            fireKey(KEYS.left);
            expect(actual).toBe(nav);
        });
        
        it("should use the passed scope", function(){
            var scope = {},
                actual;
            createNav({
                scope: scope,
                left: function(){
                    actual = this;
                }
            });
            fireKey(KEYS.left);
            expect(actual).toBe(scope);
        });
        
        it("should receive an event object as only argument", function(){
            var realEvent;
            
            createNav({
                enter: function(event){
                    realEvent = event;        
                }
            });
            fireKey(KEYS.enter);
            expect(realEvent.getXY()).toBeTruthy();
            expect(realEvent.type).toBeTruthy();
            expect(realEvent.target).toBeTruthy();
        });
    });
    
    describe("enable/disable", function(){
        it("should be enabled by default", function(){
            createNav({
                esc: defaultFn
            });
            fireKey(KEYS.esc);
            expect(defaultFn).toHaveBeenCalled();
        });
        
        it("should not fire any events when disabled", function(){
            createNav({
                esc: defaultFn
            });
            nav.disable();
            fireKey(KEYS.esc);
            expect(defaultFn).not.toHaveBeenCalled();
        });
        
        it("should fire events after being disabled then enabled", function(){
            createNav({
                esc: defaultFn
            });
            nav.disable();
            fireKey(KEYS.esc);
            expect(defaultFn).not.toHaveBeenCalled();
            nav.enable();
            fireKey(KEYS.esc);
            expect(defaultFn).toHaveBeenCalled();
        });
    });
});

