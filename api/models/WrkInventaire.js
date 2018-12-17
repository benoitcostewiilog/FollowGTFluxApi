/**
 * WrkInventaire.js
 *
 * @description :: Inventaire
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "wrk_inventaire",
  autoPK: false,

  attributes: {

    id: {
      type: 'integer',
      columnName: 'id_inventaire',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    id_utilisateur: 'integer',
    heure_prise: 'datetime',
    ref_produit: 'string',
    code_emplacement: 'string',
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

};
