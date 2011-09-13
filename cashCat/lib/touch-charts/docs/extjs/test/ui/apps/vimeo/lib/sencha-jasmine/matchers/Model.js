/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Sencha-specific matchers for convenient testing of Model expectations
 */
beforeEach(function() {
    this.addMatchers({
        /**
         * Sample usage:
         * expect('User').toHaveMany('Product');
         */
        toHaveMany: function(expected) {
            if (typeof this.actual == 'string') {
                this.actual = Ext.ModelManager.types[this.actual].prototype;
            }
            
            var associations = this.actual.associations.items,
                length       = associations.length,
                association, i;
            
            for (i = 0; i < length; i++) {
                association = associations[i];
                
                if (association.associatedName == expected && association.type == 'hasMany') {
                    return true;
                }
            }
            
            return false;
        },
        
        /**
         * Sample usage:
         * expect('Product').toBelongTo('User')
         */
        toBelongTo: function(expected) {
            if (typeof this.actual == 'string') {
                this.actual = Ext.ModelManager.types[this.actual].prototype;
            }
            
            var associations = this.actual.associations.items,
                length       = associations.length,
                association, i;
            
            for (i = 0; i < length; i++) {
                association = associations[i];
                
                if (association.associatedName == expected && association.type == 'belongsTo') {
                    return true;
                }
            }
            
            return false;
        }
    });
});
