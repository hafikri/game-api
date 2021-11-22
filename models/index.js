const User = require('./user.model')
const UserRole = require('./user-role.model')
const Room = require('./rooms.model')

User.hasOne(UserRole, {
    as: 'role',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

UserRole.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = {
    User,
    UserRole,
    Room
}