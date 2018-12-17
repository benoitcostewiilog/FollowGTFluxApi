/**
 * RefEmplacement.js
 *
 * @description :: Liste des emplacements
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: "ref_emplacement",

    attributes: {
        code_emplacement: 'string',
        libelle: 'string',
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

};
