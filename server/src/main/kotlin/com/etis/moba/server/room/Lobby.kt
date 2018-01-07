package com.etis.moba.server.room

import com.etis.moba.server.Connection
import com.etis.moba.server.protocol.GameProtocol
import com.etis.moba.server.protocol.RoomCommand
import com.etis.moba.server.protocol.RoomMessage

class Lobby(
        override val id: String,
        val protocol: GameProtocol
) : Room {
    val rooms: MutableMap<String, Room> = mutableMapOf(id to this)

    override fun closed(): Boolean = false

    override fun message(connection: Connection, message: RoomMessage) {
        val roomCommand = RoomCommand(message)
        handleJoin(roomCommand, connection)
        handleLeave(roomCommand, connection)
    }

    private fun handleJoin(command: RoomCommand, connection: Connection) {
        if (command.command == protocol.joinRoom) {
            val room = rooms.getOrPut(command.arg, { GameRoom(command.arg, protocol) })
            connection.join(room)
            connection.message(command)
        }
    }

    private fun handleLeave(command: RoomCommand, connection: Connection) {
        if (command.command == protocol.exitRoom) {
            val room = rooms.get(command.arg)!!
            connection.leave(room)
            connection.message(command)
            if (room.closed()) { rooms.remove(room.id) }
        }
    }
}