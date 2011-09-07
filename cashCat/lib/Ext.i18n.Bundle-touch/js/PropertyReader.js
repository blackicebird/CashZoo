Ext.ns('Ext.i18n');
/**
 * 
 * PropertyReader is used to read data from a .properties files
 * The .properties file might be in the traditional format which means that comments are accepted.
 * 
 * @class Ext.i18n.PropertyReader
 * @constructor
 * 
 * @author Maximiliano Fierro (elmasse)
 */
Ext.i18n.PropertyReader = function(config){
	
	Ext.regModel('PropertyModel', {
		idProperty: 'key',
		fields: ['key', 'value']
	});
	
	config = config || {};
    
	Ext.applyIf(config, {
        idProperty: 'id',
        successProperty: 'success',
        totalProperty: 'total',
		model: Ext.ModelMgr.types['PropertyModel']
    });
	
	
	//call super
	Ext.i18n.PropertyReader.superclass.constructor.call(this, config); 
	
}

Ext.extend(Ext.i18n.PropertyReader, Ext.data.Reader,{

	read: function(response){
		var propertyFile = response.responseText;
		if(!propertyFile)
			throw {message: "PropertyReader.read: File not found"};
						
		return this.readRecords(propertyFile);
	},
	
	readRecords: function(propertyFile){
		var Record = this.recordType,
			records = [], record, kv,
			f = this.readLines(propertyFile),
			l = f.length;
		
		for(var i = 0; i < l; i++){
			var kl = f[i].search(/[\s:=]/);
				record = Ext.ModelMgr.create({
				    value : this.clearValueExtraChars(f[i].substring(kl+1)),
				    key  :  this.clearKeyExtraChars(f[i].substring(0, kl))
				}, 'PropertyModel');

				records[i] = record;
		}
		
		return new Ext.data.ResultSet({
            total  : records.length,
            count  : records.length,
            records: records,
            success: true
        });
	},
	
	createAccessor: function(){},
	
	clearKeyExtraChars: function(s){
		return (s ? s.replace(/[:=]/gi, "") : "");
	},
	
	clearValueExtraChars: function(s){
		return (s ? s.replace(/\\\s*\n/gi, "") : "");
	},
	
	//private
	readLines: function(file){
		return (file ? file.match(/.*(.*\\\s*\n)+.*|^((?!^\s*[#!]).).*$/gim) : []);
	}

});

Ext.data.ReaderMgr.registerType('propertyReader', Ext.i18n.PropertyReader);