package com.etis.moba.javalin

import io.javalin.Javalin
import io.javalin.embeddedserver.jetty.websocket.WebSocketHandler

class JavalinServer(
    val sessionHandler: JavalinSessionHandler,
    val port: Int = 80,
    val path: String = "/game"
) {
    fun start() {
        Javalin.create().apply {
            port(port)
            ws(path) { ws: WebSocketHandler ->
                ws.onConnect { session -> sessionHandler.onConnect(session) }
                ws.onClose { session, statusCode, reason -> sessionHandler.onClose(session, statusCode, reason) }
                ws.onMessage { session, msg -> sessionHandler.onMessage(session, msg) }
            }
        }.start()
    }
}