const sequelize = require('./sequelize')
const { Model, DataTypes } = require('sequelize')

class Room extends Model{}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          roomName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          flag: {
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
        tableName: 'rooms',
        modelName: 'rooms',
        timestamps: true,
        paranoid: true
    }
)

module.exports = Room