const sequelize = require('./sequelize')
const { Model, DataTypes } = require('sequelize')

class User extends Model{}

User.init(
    {
        id: {
            type: DataTypes.INTEGER ,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          fullName: {
            type: DataTypes.STRING(50),
            allowNull: false
          },
          email: {
            type: DataTypes.STRING(100),
            allowNull: false
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            kdefaultValue: new Date()
          },
          updatedAt: {
            type: DataTypes.DATE,
            kdefaultValue: new Date()
          },
          deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
          }
    },
    {
        sequelize,
        tableName: 'user_game',
        modelName: 'user_game',
        timestamps: true,
        paranoid: true
    }
)

module.exports = User