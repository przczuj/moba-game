package com.etis.moba

import com.etis.moba.javalin.JavalinServer
import com.etis.moba.javalin.JavalinSessionHandler
import com.etis.moba.server.GameServer

fun main(args: Array<String>) {
    JavalinServer(
            sessionHandler = JavalinSessionHandler(GameServer()),
            port = 8080,
            path = "/game"
    ).start()
}