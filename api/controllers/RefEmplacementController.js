/**
 * RefEmplacementController
 *
 * @description :: Server-side logic for managing Refemplacements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    checkTable: function (req, res) {
		TableSyncService.checkTable(RefEmplacement, req, res);

	},
	createSync: function (req, res) {
		TableSyncService.createSync(RefEmplacement, req, res);
	},


	deleteSync: function (req, res) {
		TableSyncService.deleteSync(RefEmplacement, req, res);

	},
	updateSync: function (req, res) {
		TableSyncService.updateSync(RefEmplacement, req, res);

	}
};

