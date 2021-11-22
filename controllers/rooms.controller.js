// const {User, Room} = require('../models')
const Room = require('../models/rooms.model')

exports.createRoom = async (req, res, next) => {
    try {
        const {user} = req
        const {roomName} = req.body

        if(!user) {
            throw {
                message: 'invalid token'
            }
        }

        let room = await Room.findOne({
            where: {
                roomName
            }
        })

        const flag = `Room-${(Math.random()+1).toString(36).substring(7)}`
        console.log(flag)
        if(!room) {
            room = await Room.create({
                roomName,
                flag
            })
        }

        return res.status(200).json({
            flag: room.flag
        })

    } catch (error) {
        next(error)
    }
}