package com.etis.moba.server.room

import com.etis.moba.server.Connection
import com.etis.moba.server.MessageSender
import com.etis.moba.server.protocol.GameProtocol
import com.etis.moba.server.protocol.RoomCommand
import com.etis.moba.server.protocol.RoomMessage

class GameRoom(
        override val id: String,
        private val protocol: GameProtocol
) : Room {
    private val members = mutableMapOf<String, Connection>()
    private val sender = MessageSender(members.values)

    override fun closed(): Boolean = members.isEmpty()

    override fun message(connection: Connection, message: RoomMessage) {
        val roomCommand = RoomCommand(message)
        handleJoin(roomCommand, connection)
        handleLeave(roomCommand, connection)

        sender.send(message)
    }

    private fun handleJoin(command: RoomCommand, connection: Connection) {
        if (command.command == protocol.joinRoom) {
            members += connection.id to connection
        }
    }

    private fun handleLeave(command: RoomCommand, connection: Connection) {
        if (command.command == protocol.exitRoom) {
            members.remove(connection.id)
        }
    }
}