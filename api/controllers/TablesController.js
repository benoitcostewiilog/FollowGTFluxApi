/**
 * TablesController
 *
 * @description :: Server-side logic for managing tables
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    checkTable: function (req, res) {
        var moment = require('moment');
        var valuesClient = req.param("data");

        var arrayRes = [];

        Tables.find({}).exec(function (err, tables) {
            for (var key in tables) {
                var tableServer = tables[key];
                var lastUpdatedServer = moment(tableServer.lastUpdated);
                var nbRowServer = tableServer.nbRow;
                for (var keyClient in valuesClient) {
                    var tableClient = valuesClient[keyClient];

                    if (tableClient.name == tableServer.name) {

                        var lastUpdatedClient = moment(tableClient.syncAt);
                        var nbRowClient = tableClient.nbRow;

                        if (lastUpdatedServer.isAfter(lastUpdatedClient) || !lastUpdatedClient.isValid() || nbRowClient!=nbRowServer) {
                            sails.log.info("Table " + tableServer.name + " need an update (client:" + lastUpdatedClient.toISOString()+" | "+nbRowClient + ", server:" + lastUpdatedServer.toISOString()+" | "+nbRowServer + ")");
                            arrayRes.push({ table: tableServer.name, syncAt: lastUpdatedServer.toISOString(),nbRow:nbRowServer });
                        }
                        break;

                    }
                }

            }

            res.send(JSON.stringify(arrayRes));
        });


    }
};

