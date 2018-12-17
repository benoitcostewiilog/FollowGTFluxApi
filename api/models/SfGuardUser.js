/**
 * SfGuardUser.js
 *
 * @description :: Liste des users
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: "sf_guard_user",
  
    attributes: {
        first_name: 'string',
        last_name: 'string',
        username: 'string',
        password_nomade: 'string',
        last_login: 'datetime',
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
