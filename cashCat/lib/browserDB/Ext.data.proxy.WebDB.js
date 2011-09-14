/**
 * @author Grgur Grisogono
 *
 * WebSQL proxy connects models and stores to local WebSQL database.
 *
 * WebSQL is only available in Chrome and Safari at the moment.
 * 
 * Version: 0.11
 *
 * TODO: respect sorters, filters, start and limit options on the Operation; failover option for remote proxies, ..
 */
Ext.data.WebSQLProxy = Ext.extend(Ext.data.DataProxy, {
    alias : 'data.websqlproxy',
    alternateClassName: 'Ext.data.WebSQLProxy',

    /**
     * @cfg {String} version
     * database version. If different than current, use updatedb event to update database
     */
    dbVersion: '1.0',

    /**
     * @cfg {String} dbName
     * Name of database
     */
    dbName: undefined,

    /**
     * @cfg {String} dbDescription
     * Description of the database
     */
    dbDescription: '',

    /**
     * @cfg {String} dbSize
     * Max storage size in bytes
     */
    dbSize: 10*1024*1024,

    /**
     * @cfg {String} dbTable
     * Name for table where all the data will be stored
     */
    dbTable: undefined,

    /**
     * @cfg {String} pkField
     * Primary key name. Defaults to idProperty
     */
    pkField: undefined,

    /**
     * @cfg {String} pkType
     * Type of primary key. By default it an autoincrementing integer
     */
    pkType: 'INTEGER PRIMARY KEY ASC',
	
	/**
     * @cfg {Array} initialData
     * Initial data that will be inserted in object store on store creation
     */
	initialData: [],

    /**
     * @private
     * db object
     */
    db: undefined,

	/**
     * @private
     * used to monitor initial data insertion. A helper to know when all data is in. Helps fight asynchronous nature of idb. 
     */
	initialDataCount: 0,
	
	/**
     * @private
     * Trigger that tells that proxy is currently inserting initial data
     */
	insertingInitialData: false,
	
    /**
     * Creates the proxy, throws an error if local storage is not supported in the current browser.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        Ext.data.ScriptTagProxy.superclass.constructor.apply(this,arguments);
		
		this.checkDependencies();

        this.addEvents('dbopen', 'updatedb','exception', 'cleardb', 'initialDataInserted', 'noWebDb');

        this.initialize();
    },

    /**
     * @private
     * Sets up the Proxy by opening database and creating table if necessary
     */
    initialize: function() {
        var me = this,
            pk = 'ID',
            db;

        me.db = db = openDatabase(me.dbName, me.dbVersion, me.dbDescription, me.dbSize);
        db.onError = function(tx, e){
            console.log("errors: %s", e.message);
        };
        db.onSuccess = function(tx, r) {
            console.log("well done");
        };

        //take care of the table
        db.transaction(function(tx) {
            pk = me.pkField || me.getReader().idProperty || pk;
            me.pkField = pk;
            
            var query = 'SELECT * FROM '+me.dbTable+' LIMIT 1';
            var args = [];
            var createTable = function() {
                var query = 'CREATE TABLE IF NOT EXISTS ' +
                          me.dbTable + '('+pk+' ' + me.pkType+', '+me.constructFields()+')';
                var args = [];
                if (Ext.debug) {
                    console.log(query, args);
                }
                tx.executeSql(query,
                          args,
                          Ext.createDelegate(me.addInitialData, me),  //on success
                          Ext.createDelegate(me.onError, me));        // on error
            };
            if (Ext.debug) {
                console.log(query, args);
            }
            tx.executeSql(query, args, Ext.emptyFn, createTable);

          });
    },

    /**
     * @private
     * Get reader data and set up fields accordingly
     * Used for table creation only
     * @return {String} fields separated by a comma
     */
    constructFields: function() {
        var me = this,
            m = me.getModel(),
            fields = m.prototype.fields.items,
            flatFields = [];

        Ext.each(fields, function(f) {
            var name = f.name;
            var type = f.type.type;

            type = type.replace(/int/i, 'INTEGER')
                .replace(/string/i,'TEXT')
                .replace(/date/i, 'DATETIME');

            flatFields.push(name + ' ' + type);
        });

        return flatFields.join(',');
    },

	/**
     * Universal error reporter for debugging purposes
	 * @param {Object} err Error object.
     */
    onError: function(err, e) {
        var error = (e && e.message) || err;
        throw new Error(error + arguments);

    },

	/**
     * Check if all needed config options are set
     */
	checkDependencies: function(){
		var me = this;

        if (!window.openDatabase) {
            me.fireEvent('noWebDb');
            throw new Error("WebDB is not supported in your browser.");
        }
		if (!Ext.isString(me.dbName))  throw new Error("The dbName string has not been defined in your Ext.data.proxy.WebDB");
		if (!Ext.isString(me.dbTable)) throw new Error("The dbTable string has not been defined in your Ext.data.proxy.WebDB");

		return true;
	},

    /**
     * Add initial data if set at {@link #initialData}
     */
    addInitialData: function() {
        this.addData();
    },

	/**
     * Add data when needed
     * Also add initial data if set at {@link #initialData}
     * @param {Array/Ext.data.Store} newData Data to add as array of objects or a store instance. Optional
     * @param {Boolean} clearFirst Clear existing data first
     */
	addData: function(newData, clearFirst) {
		var me = this,
			model = me.getModel().modelName,
		    data = newData || me.initialData;

        //clear objectStore first
        if (clearFirst===true){
            me.clear();
            me.addData(data);
            return;
        }

        if (Ext.isObject(data) && data.isStore===true) {
            data = me.getDataFromStore(data);
        }

		me.initialDataCount = data.length;
		me.insertingInitialData = true;

		Ext.each(data, function(entry) {
			Ext.ModelMgr.create(entry, model).save();
		})
	},

    /**
     * Get data from store. Usually from Server proxy.
     * Useful if caching data data that don't change much (e.g. for comboboxes)
     * Used at {@link #addData}
     * @private
     * @param {Ext.data.Store} store Store instance
	 * @return {Array} Array of raw data
     */
    getDataFromStore: function(store) {
        var data = [];
        store.each(function(item) {
            data.push(item.data)
        });
        return data;
    },
    //inherit docs
    create: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            id, record, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    getSelectSQL: function(operation, table) {
        var selectSQL = table + '.*';
        Ext.each(operation.prefetch, function(field) {
            Ext.each(field.columns, function(column) {
                selectSQL += ', ' + field.table + '.' + column + ' AS ' + field.table + '_' + column;
            });
            Ext.each(field.prefetch, function(prefetch) {
                Ext.each(prefetch.columns, function(column) {
                    selectSQL += ', ' + prefetch.table + '.' + column + ' AS ' + prefetch.table + '_' + column;
                });
            });
        });
        return selectSQL;
    },

    getRelatedSQL: function(operation, table, prefetch) {

        var joinSQL = ' ';
        joinSQL += "LEFT JOIN `" + prefetch.table
        + "` ON `" + prefetch.table + "`.`id` = `" + table + '`.`' + prefetch.foreignKey + "` ";
        return joinSQL;
    },

    getAllRelatedSQL: function(operation, table) {
        var sql = '';
        var that = this;
        Ext.each(operation.prefetch, function(prefetch){
            sql += that.getRelatedSQL(operation, table, prefetch);
            Ext.each(prefetch.prefetch, function(prefetch2){
                sql += that.getRelatedSQL(operation, prefetch.table, prefetch2);
            });
        });
        return sql;
    },

    getWhereSQL: function(operation, table) {
        var sql = ' WHERE ';
        Ext.each(operation.filters, function(filter) {
            if (filter.property && filter.value) {
                var property = filter.property;
                var dbTable = table;
                if (property.indexOf('.') > 0) {
                    dbTable = property.split('.')[0];
                    property = property.split('.')[1];
                }
                if (filter.exactMatch) {
                    sql += '`' + dbTable + '`.`' + property + '` = "' + filter.value + '" AND ';
                }
                else {
                    sql += '`' + dbTable + '`.`' + property + '` LIKE "' + filter.value + '" AND ';
                }
            }
        });
        sql += "1=1";
        return sql;
    },

    getSortSQL: function(operation, table) {
        var sql = ' ORDER BY ';
        Ext.each(operation.sorters, function(filter) {
            var dir = filter.direction || 'ASC';
            if (filter.property) {
                sql += filter.property + ' ' + dir + ', ';
            }
        });
        sql += "id";
        return sql;
    },

    //inherit docs
    read: function(operation, callback, scope) {
        var records = [],
            me      = this;

        var whereSQL = this.getWhereSQL(operation, me.dbTable);
        var joinSQL = this.getAllRelatedSQL(operation, me.dbTable);
        var selectSQL = this.getSelectSQL(operation, me.dbTable);
        var sortSQL = this.getSortSQL(operation, me.dbTable);
        var extraSQL = joinSQL + whereSQL + sortSQL;
        var finishReading = function(record) {
            me.readCallback(operation,record);

            if (typeof callback == 'function') {
                callback.call(scope || this, operation);
            }
        }

        //read a single record
        if (operation.id) {
            this.getRecord(operation.id,finishReading,me);
        } else {
            this.getAllRecords(finishReading,me, extraSQL, selectSQL);
            operation.setSuccessful();
        }
        console.log('%s from %s', selectSQL, extraSQL);
    },

	/**
     * Injects data in operation instance
     */
    readCallback: function(operation, records) {
        var rec = Ext.isArray(records)?records:[records];
        operation.setSuccessful();
        operation.setCompleted();
        operation.resultSet = new Ext.data.ResultSet({
            records: rec,
            total  : rec.length,
            loaded : true
        });
    },

    //inherit docs
    update: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            record, id, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.updateRecord(record);
        }
        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    //inherit
    destroy: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            i;

        for (i = 0; i < length; i++) {
//            Ext.Array.remove(newIds, records[i].getId());
            this.removeRecord(records[i], false);
        }

        //this.setIds(newIds);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    /**
     * @private
     * Created array of objects, each representing field=>value pair.
     * @param {Object} tx Transaction
     * @param {Object} rs Response
	 * @return {Array} Returns parsed data
     */
    parseData: function(tx, rs) {
        var rows = rs.rows,
            data = [],
            i=0;
        for (; i < rows.length; i++) {
            data.push(rows.item(i));
        }
        return data;
    },

    /**
     * @private
     * Fetches a single record by id.
     * @param {Mixed} id Record id
     * @param {Function} callback Callback function
	 * @param {Object} scope Callback fn scope
     */
    getRecord: function(id, callback, scope) {
        var me = this,
            Model = this.model,
            record,
            onSuccess = function(tx,rs) {
                var result = me.parseData(tx,rs);
                record = new Model(result, id);
                if (typeof callback == 'function') {
                    callback.call(scope || me, result, me);
                }
            };

        me.db.transaction(function(tx){
            var query = 'SELECT * FROM ' + me.dbTable + ' where '+me.pkField+' = ?';
            var args = [id];
            if (Ext.debug) {
                console.log(query, args);
            }
            tx.executeSql(query,
                args,
                onSuccess,  //on success
                Ext.createDelegate(me.onError, me));        // on error
        });

        return true;
    },



	/**
     * @private
     * Fetches all records
     * @param {Function} callback Callback function
	 * @param {Object} scope Callback fn scope
     */
    getAllRecords: function(callback, scope, extraSQL, selectSQL) {
        var me = this,
            Model = this.model,
            record,
            onSuccess = function(tx,rs) {
                var records = me.parseData(tx,rs),
                    results = [],
                    i=0,
                    id;
                for (; i<records.length;i++) {
                    id = records[i][me.pkField];
                    results.push(new Model(records[i], id));
                }

                if (typeof callback == 'function') {
                    callback.call(scope || me, results, me);
                }
            };

        me.db.transaction(function(tx){
            var query = 'SELECT ' + selectSQL + ' FROM ' + me.dbTable + extraSQL;
            var args = [];
            if (Ext.debug) {
                console.log(query, args);
            }
            tx.executeSql(query,
                args,
                onSuccess,  //on success
                Ext.createDelegate(me.onError, me));        // on error
        });

        return true;
    },

    /**
     * Saves the given record in the Proxy.
     * @param {Ext.data.Model} record The model instance
     */
    setRecord: function(record) {
        var me = this,
            rawData = record.data,
            fields = [],
            values = [],
            placeholders = [],
            onSuccess = function(tx,rs) {
                if (me.insertingInitialData) {
                    me.initialDataCount--;
                    if (me.initialDataCount === 0) {
                        me.insertingInitialData = false;
                        me.fireEvent('initialDataInserted');
                    }
                }
            };

        //extract data to be inserted
        for (var i in rawData) {
            fields.push(i);
            values.push(rawData[i]);
            placeholders.push('?');
        }

        me.db.transaction(function(tx){
            var query = 'INSERT INTO ' + me.dbTable+'('+fields.join(',')+') VALUES ('+placeholders.join(',')+')';
            var args = values;
            if (Ext.debug) {
                console.log(query, args);
            }
            tx.executeSql(query,
                args,
                onSuccess,  //on success
                Ext.createDelegate(me.onError, me));        // on error
        });

        return true;
    },

	/**
     * Updates the given record.
     * @param {Ext.data.Model} record The model instance
     */
    updateRecord: function(record) {
        var me = this,
            id = record.internalId || record[me.pkField],
            key = me.getReader().getIdProperty(),
            modifiedData = record.modified,
            newData = record.data,
            pairs = [],
            values = [],
            onSuccess = function(tx,rs) {
                //add new record if id doesn't exist
                if (!rs.rowsAffected) me.setRecord(record);
            };


        for (var i in modifiedData) {
            pairs.push(i+' = ?');
            values.push(newData[i]);
        }
        values.push(id);

         me.db.transaction(function(tx){
            var query = 'UPDATE ' + me.dbTable + ' SET '+pairs.join(',')+' WHERE '+key+' = ?';
            var args = values;
            if (Ext.debug) {
                console.log(query, args);
            }
            tx.executeSql(query,
                args,
                onSuccess,  //on success
                Ext.createDelegate(me.setRecord, me, [record]));        // on error
        });

        return true;
    },

    /**
     * @private
     * Physically removes a given record from the object store. 
     * @param {Mixed} id The id of the record to remove
     */
    removeRecord: function(id) {
        if (typeof(id) == "object"){
            id = id.getId();
        }
        var me = this;

        me.db.transaction(function(tx){
            var query = 'DELETE FROM ' + me.dbTable + ' WHERE ' + me.pkField +' = ?';
            var args = [id];
            if (Ext.debug) {
                console.log(query, args);
            }
            tx.executeSql(query,
                args,
                function(){
                    console.log("delete operation was executed successfully!");
                },
                function(){
                    console.log("delete operation was failed!");
                }
//                Ext.emptyFn,  //on success
//                Ext.createDelegate(me.onError, me)
            );        // on error
        },function(){
            console.log("it encountered some errors.")
        },function(){
            console.log("it executed.")
        });

        return true;

    },

    /**
     * Destroys all records stored in the proxy 
     */
    clear: function(callback, scope) {
        var me = this;

        me.db.transaction(function(tx){
            var query = 'DELETE FROM ' + me.dbTable;
            var args = [];
            if (Ext.debug) {
                console.log(query, args);
            }
            tx.executeSql(query,
                args,
                Ext.emptyFn,  //on success
                Ext.createDelegate(me.onError, me));        // on error
        });

        return true;
    }
});

Ext.data.ProxyMgr.registerType("websqlproxy", Ext.data.WebSQLProxy);