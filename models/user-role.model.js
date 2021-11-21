const sequelize = require('./sequelize')
const { Model, DataTypes } = require('sequelize')

class UserRole extends Model{}

UserRole.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          name: {
            type: DataTypes.ENUM('SuperAdmin', 'PlayerUser'),
            allowNull: false
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
          },
          deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
          }
    },
    {
        sequelize,
        tableName: 'user_roles',
        modelName: 'user_roles',
        timestamps: true,
        paranoid: true
    }
)

module.exports = UserRole