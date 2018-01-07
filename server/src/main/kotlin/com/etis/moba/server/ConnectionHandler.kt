package com.etis.moba.server

import com.etis.moba.server.protocol.GameProtocol
import com.etis.moba.spi.Session
import java.time.Instant

class ConnectionHandler(
        val protocol: GameProtocol
) {
    val connections: MutableMap<String, Connection> = mutableMapOf()

    fun newConnection(session: Session): Connection {
        val connection = Connection(Instant.now(), session)
        connections.put(session.toString(), connection)
        return connection
    }

    fun getConnection(id: String): Connection {
        return connections.get(id)!!
    }

    fun close(connection: Connection) {
        connection.close()
        connections.remove(connection.id)
    }
}