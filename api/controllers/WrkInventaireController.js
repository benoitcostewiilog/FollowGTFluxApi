/**
 * WrkInventaireController
 *
 * @description :: Server-side logic for managing Wrkinventaires
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    checkTable: function (req, res) {
		var moment = require('moment');
		var dateLimit = moment().subtract(15, 'days').format();
		var queryLimit = { where: { heure_prise: { '>': dateLimit } } };
		TableSyncService.checkTable(WrkInventaire, req, res, queryLimit);

	},
	createSync: function (req, res) {
		TableSyncService.createSync(WrkInventaire, req, res);
	},


	deleteSync: function (req, res) {
		TableSyncService.deleteSync(WrkInventaire, req, res);

	},
	updateSync: function (req, res) {
		TableSyncService.updateSync(WrkInventaire, req, res);

	}
};

