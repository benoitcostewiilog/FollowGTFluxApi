/**
 * RefSite.js
 *
 * @description :: Groupage des colis
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "wrk_groupe",
  autoPK: false,

  attributes: {

    id: {
      type: 'integer',
      columnName: 'id_groupe',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    libelle: 'string',
    ref_produit: 'string',
    date: 'datetime',
    id_utilisateur: 'integer',
    quantite: 'integer',
    createdAt: {
      type: 'datetime',
      columnName: 'created_at'
    },
    updatedAt: {
      type: 'datetime',
      columnName: 'updated_at'
    },
    sync_id: {
      type: 'string',
      unique: true,
    }
  },
  afterUpdate: function (record, next) {
    TableSyncService.updateTableSync(this);
    next();
  },
  afterCreate: function (record, next) {
    TableSyncService.updateTableSync(this);
    next();
  },
  afterDestroy: function (record, next) {
    TableSyncService.updateTableSync(this);
    next();
  }
};
