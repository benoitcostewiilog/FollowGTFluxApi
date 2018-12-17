/**
 * WrkMouvementController
 *
 * @description :: Server-side logic for managing Wrkmouvements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	checkTable: function (req, res) {
		var moment = require('moment');
		var dateLimit = moment().subtract(5, 'days').format();
		var queryLimit = { where: { heure_prise: { '>': dateLimit }, type: ["prise", "depose"] } };
		TableSyncService.checkTable(WrkMouvement, req, res, queryLimit);
	},
	createSync: function (req, res) {
		TableSyncService.createSync(WrkMouvement, req, res);
	},


	deleteSync: function (req, res) {
		TableSyncService.deleteSync(WrkMouvement, req, res);

	},
	updateSync: function (req, res) {
		TableSyncService.updateSync(WrkMouvement, req, res);

	},

	uploadFile: function (req, res) {
		var uploadFile = req.file('file');
		FileUploadService.uploadFile(uploadFile, "wrkmouvement").then((file) => {
			res.json({ status: 200, fileURL: file.fileURL, fileName: file.fileName });
		}, (error) => {
			return res.serverError(error);
		});

	},
};

