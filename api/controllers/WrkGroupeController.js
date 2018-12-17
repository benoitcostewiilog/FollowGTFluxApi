/**
 * WrkGroupeController
 *
 * @description :: Server-side logic for managing Wrkgroupes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    checkTable: function (req, res) {
		var moment = require('moment');
		var dateLimit = moment().subtract(15, 'days').format();
		var queryLimit = { where: { date: { '>': dateLimit } } };
		TableSyncService.checkTable(WrkGroupe, req, res, queryLimit);

	},
	createSync: function (req, res) {
		TableSyncService.createSync(WrkGroupe, req, res);
	},


	deleteSync: function (req, res) {
		TableSyncService.deleteSync(WrkGroupe, req, res);

	},
	updateSync: function (req, res) {
		TableSyncService.updateSync(WrkGroupe, req, res);

	}
};

