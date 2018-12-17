module.exports = {

    //TODO AJOUTER LES METHODES .publishCreate(), .publishUpdate() et .publishDestroy()

    updateTableSync: function (table,disableSocket) {
        disableSocket=disableSocket?true:false;
        var tableName = table.tableName;
        table.find().limit(1).sort("updatedAt DESC").exec(function createFindCB(error, results) {
            if (error) {
                sails.log.error(error);
                return;
            }
            table.count().exec(function createFindCB(error, nbRow) {
                if (error) {
                    sails.log.error(error);
                    return;
                }
                if (results && results.length > 0) {
                    var date = results[0].updatedAt;
                } else {
                    var moment = require('moment');
                    var date = moment().toISOString();
                }

                Tables.findOrCreate({ name: tableName }, { name: tableName, lastUpdated: date, nbRow: nbRow }).exec(function createFindCB(error, createdOrFoundRecords) {
                    if (error) {
                        sails.log.error(error);
                        return;
                    }

                    Tables.update({ name: tableName }, { lastUpdated: date, nbRow: nbRow }).exec(function afterwards(err, updated) {

                        if (err) {
                            sails.log.error(err);
                            return;
                        }
                        sails.log.verbose("Table " + tableName + " updated :" + date + " , nbRow=" + nbRow);
                        if(!disableSocket){
                            var objectAfter = updated[0];
                            var diff = TableSyncService.getDiffObject(createdOrFoundRecords, objectAfter);
                            Tables.publishUpdate(createdOrFoundRecords.id, diff, null, { previous: createdOrFoundRecords });
                        }
                    });
                });
            });

        });


    },

    checkTable: function (table, req, res, limitQuery) {
        var moment = require('moment');
        limitQuery = limitQuery || { where: {} };
        var idArray = req.param("data");
        var conditions = req.param("condition",{});
        var syncAt = moment(req.param("syncAt")).format("YYYY-MM-DD HH:mm:ss.SSS"); //conversion au format date sql
        var arrayRes = { created: [], updated: [], deleted: [] };

        var query = limitQuery || { where: {} };
        for(var attr in conditions){
             query.where[attr]=conditions[attr];
        }
        //sails.log.verbose(table.tableName+" conditions : " + JSON.stringify(conditions)+"  --> query : "+JSON.stringify(query));
       

        if (idArray == undefined || idArray == null || idArray == "") {
            idArray = [];
        } else {
            if (!query.where) {
                query.where = {};
            }
            query.where.id = { '!': idArray };
        }
       // sails.log.verbose(table.tableName+" - Id received : " + JSON.stringify(idArray));

        //gestion create
        table.find(query).exec(function (err, objects) {
            if(err){
                sails.log.error(err);
            }

            for (var key in objects) {
                objects[key] = TableSyncService.excludeFieldToSync(objects[key]);
            }
            arrayRes.created = objects;
           // sails.log.verbose(table.tableName+" - Data created : " + JSON.stringify(arrayRes.created));
            sails.log.info(table.tableName+" - Data created : " + arrayRes.created.length);

            //gestion delete
            query.where.id = idArray;
            table.find(query).exec(function (err, objects) {
                for (var key in idArray) {
                    var item = idArray[key];
                    var found = false;
                    for (var keyobject in objects) {
                        var object = objects[keyobject];
                        if (item == object.id) {
                            found = true;
                            delete objects[keyobject];
                            break;
                        }

                    }
                    if (!found) {
                        arrayRes.deleted.push(item);
                    }
                }

               // sails.log.verbose(table.tableName+" - Id deleted : "+JSON.stringify(arrayRes.deleted));
               sails.log.info(table.tableName+" - Data deleted : " + arrayRes.deleted.length);
                //gestion update
                table.find({ updatedAt: { '>': syncAt }, id: idArray }).exec(function (err, objects) {
                    for (var key in objects) {
                        objects[key] = TableSyncService.excludeFieldToSync(objects[key]);
                    }
                    arrayRes.updated = objects;
                  //  sails.log.verbose(table.tableName+" - Data updated : "+JSON.stringify(arrayRes.updated));
                    res.send(JSON.stringify(arrayRes));
                });

            });
        });

    },

    excludeFieldToSync: function (objectToReturn) {
        var moment = require('moment');
        delete objectToReturn.createdAt;
        objectToReturn.updatedAtServer = moment(objectToReturn.updatedAt).format("YYYY-MM-DD HH:mm:ss.SSS"); //conversion au format date sql
        delete objectToReturn.updatedAt;

        return objectToReturn;
    },
    createSync: function (table, req, res, limitQuery) {
        var data = req.param("data");
        var query = limitQuery || { where: {} };
        async.mapLimit(data, 10, function iterator(object, mapCb) {
            if (object != null) {
                var idClient = object.id;
                delete object.id;

                let promiseSyncId = Promise.resolve(null);
                if (object.sync_id) {
                    query.where.sync_id = object.sync_id;
                    promiseSyncId = table.findOne(query).catch(() => null);
                }

                promiseSyncId.then((dataFound) => {

                    if (!dataFound) {
                        table.create(object).exec(function (err, object) {
                            //   sails.log.verbose(table + " inserted : " + JSON.stringify(object));
                            if (err) {
                                sails.log.error(err);
                                return mapCb(null, null);
                            }
                            table.publishCreate(object);
                            return mapCb(null, { idClient: idClient, idServer: object.id });
                        });
                    } else {
                        sails.log.error(table + " createSync, sync_id exist, data to insert" + JSON.stringify(object));
                        return mapCb(null, { idClient: idClient, idServer: dataFound.id });
                    }
                });

            } else {
                return mapCb(null, null);
            }

        }, function (err, result) {
            async.filter(result, function (res, callback) {
                if (res != null) {
                    callback(true);
                } else {
                    callback(false)
                }

            }, function (results) {
                res.send(JSON.stringify(results));
            });

        });
    },


    deleteSync: function (table, req, res) {
        var data = req.param("data");
        async.mapLimit(data, 10, function iterator(object, mapCb) {
            if (object != null) {
                var idClient = object.id;

               // sails.log.verbose(object);
                table.destroy({ id: object.idServer }).exec(function (err) {
                    //sails.log.verbose(table + " deleted : " + JSON.stringify(object));
                    if (err) { return mapCb(null, null) }
                    table.publishDestroy(object.idServer);
                    return mapCb(null, { idClient: idClient, idServer: object.idServer });
                });
            } else {
                return mapCb(null, null);
            }

        }, function (err, result) {
            async.filter(result, function (res, callback) {
                if (res != null) {
                    callback(true);
                } else {
                    callback(false)
                }

            }, function (results) {
                res.send(JSON.stringify(results));
            });
        });


    },
    updateSync: function (table, req, res) {
        var data = req.param("data");
        var idUpdated = [];
        async.mapLimit(data, 10, function iterator(object, mapCb) {
            if (object != null) {
                var idClient = object.id;
                delete object.id;
                delete object.createdAt;
                delete object.updatedAt;
                table.findOne({ id: object.idServer }, object).exec(function (err, objectBefore) {
                    if (err) { return mapCb(null, null); }
                    if (objectBefore) {
                            table.update({ id: object.idServer }, object).exec(function (err, objects) {

                                if (err) { return mapCb(null, null); }

                                if (objects.length > 0) {
                                    var objectAfter = objects[0];
                                    var diff = TableSyncService.getDiffObject(objectBefore, objectAfter);
                                   // sails.log.verbose(table + " updated : " + JSON.stringify(objectAfter));
                                    table.publishUpdate(object.idServer, diff, req, { previous: objectBefore });
                                    idUpdated.push(objectAfter.id);
                                    return mapCb(null, { idClient: idClient, idServer: objectAfter.id });
                                } else {
                                    return mapCb(null, null);
                                }


                            });

                        

                    } else {
                        return mapCb(null, null);
                    }
                });
            } else {
                return mapCb(null, null);
            }

        }, function (err, result) {
            async.filter(result, function (res, callback) {
                if (res != null) {
                    callback(true);
                } else {
                    callback(false)
                }

            }, function (results) {
                if(table.afterAllSync){
                    table.afterAllSync(idUpdated);
                }
                res.send(JSON.stringify(results));
            });
        });


    },

    getDiffObject: function (oldObject, newObject) {
        var diff = {};
        for (var i in oldObject) {
            if (i in newObject) {

                if (JSON.stringify(oldObject[i]) == JSON.stringify(newObject[i])) {

                } else {
                    diff[i] = newObject[i];

                }
            }
        }

        return diff;
    }


};
