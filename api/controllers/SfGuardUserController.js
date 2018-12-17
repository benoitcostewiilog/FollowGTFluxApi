/**
 * SfGuardUserController
 *
 * @description :: Server-side logic for managing Sfguardusers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    checkTable: function (req, res) {

		TableSyncService.checkTable(SfGuardUser, req, res);

	},
	createSync: function (req, res) {
		TableSyncService.createSync(SfGuardUser, req, res);
	},


	deleteSync: function (req, res) {
		TableSyncService.deleteSync(SfGuardUser, req, res);

	},
	updateSync: function (req, res) {
		TableSyncService.updateSync(SfGuardUser, req, res);

	}
};

