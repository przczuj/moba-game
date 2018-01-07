package com.etis.moba.javalin

import com.etis.moba.spi.Message
import com.etis.moba.spi.Session
import io.javalin.embeddedserver.jetty.websocket.WsSession

class JavalinSession(
    val session: WsSession
) : Session {
    override fun send(message: Message) {
        session.send(message.toString())
    }

    override fun toString(): String {
        return session.hashCode().toString()
    }
}