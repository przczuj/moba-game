package com.etis.moba.javalin

import com.etis.moba.spi.Protocol
import com.etis.moba.spi.Server
import io.javalin.embeddedserver.jetty.websocket.WsSession

class JavalinSessionHandler(
    val server: Server
) {
    fun onConnect(
        session: WsSession
    ) {
        server.newConnection(JavalinSession(session))
    }

    fun onClose(
        session: WsSession,
        statusCode: Int,
        reason: String
    ) {
        server.recvMessage(server.protocol.closeConnection(JavalinSession(session)))
    }

    fun onMessage(
        session: WsSession,
        msg: String
    ) {
        server.recvMessage(server.protocol.message(JavalinSession(session), msg))
    }
}
