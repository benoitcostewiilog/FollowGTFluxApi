/**
 * WrkMouvement.js
 *
 * @description :: Liste des mouvements
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: "wrk_mouvement",
  autoPK: false,

  attributes: {

    id: {
      type: 'integer',
      columnName: 'id_mouvement',
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    id_utilisateur: 'integer',
    heure_prise: 'datetime',
    ref_produit: 'string',
    code_emplacement: 'string',
    type: 'string',
    groupe: 'string',
    commentaire: 'string',
    quantite: 'integer',
    signature: 'json',
    photos: 'json',
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
  }
};
