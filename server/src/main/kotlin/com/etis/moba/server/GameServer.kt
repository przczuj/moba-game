package com.etis.moba.server

import com.etis.moba.server.protocol.GameProtocol
import com.etis.moba.server.protocol.RoomMessage
import com.etis.moba.server.room.Lobby
import com.etis.moba.spi.Message
import com.etis.moba.spi.Session
import com.etis.moba.spi.Server

class GameServer : Server {
    val lobbyName = "LOBBY"

    override val protocol: GameProtocol = GameProtocol(lobbyName)
    val lobby = Lobby(lobbyName, protocol)
    val connectionHandler = ConnectionHandler(protocol)

    override fun newConnection(session: Session) {
        connectionHandler.newConnection(session).join(lobby)
    }

    override fun recvMessage(message: Message) {
        val connection = connectionHandler.getConnection(message.author)
        val roomMessage = RoomMessage(message)
        val room = connection.rooms[roomMessage.roomId]!!

        room.message(connection, roomMessage)

        if (!connection.rooms.containsKey(lobbyName)) {
            connectionHandler.close(connection)
        }
    }
}