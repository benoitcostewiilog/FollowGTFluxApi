/**
 * AdmParametrage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'adm_supervision_parametrage',
  attributes: {
    nom: 'string',
    valeur: 'json',
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
    sails.log.info("afterUpdate " + this.tableName);
    TableSyncService.updateTableSync(this);
    next();
  },
  afterCreate: function (record, next) {
    sails.log.info("afterCreate " + this.tableName);
    TableSyncService.updateTableSync(this);
    next();
  },
  afterDestroy: function (record, next) {
    sails.log.info("afterDestroy " + this.tableName);
    TableSyncService.updateTableSync(this);
    next();
  },

};
