/**
 * AdmParametrageController
 *
 * @description :: Server-side logic for managing Admparametrages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  checkTable: function (req, res) {
    TableSyncService.checkTable(AdmParametrage, req, res);

  },
  createSync: function (req, res) {
    TableSyncService.createSync(AdmParametrage, req, res);
  },

  deleteSync: function (req, res) {
    TableSyncService.deleteSync(AdmParametrage, req, res);

  },
  updateSync: function (req, res) {
    TableSyncService.updateSync(AdmParametrage, req, res);
  },
};
