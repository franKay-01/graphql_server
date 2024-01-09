'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({Orders}) {
      this.hasMany(Orders, {foreignKey: 'user_id' , as: 'orders'})
    }
  }

  Users.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Title is a required field"},
        notEmpty: {msg: "Title is a required field"}
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "First name is a required field"},
        notEmpty: {msg: "First name is a required field"}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Last name is a required field"},
        notEmpty: {msg: "Last name is a required field"}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username must be unique',
      },
      validate: {
        notNull: {msg: "Username is a required field"},
        notEmpty: {msg: "Username is a required field"},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique',
      },
      validate: {
        notNull: {msg: "Email is a required field"},
        notEmpty: {msg: "Email is a required field"},
        isEmail: {msg: "Email format is in-correct"}
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Country is a required field"},
        notEmpty: {msg: "Country is a required field"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reference_no: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'Users',
  });
  return Users;
};