package com.etis.moba.server

import com.etis.moba.server.protocol.RoomMessage
import com.etis.moba.spi.Message

class MessageSender(
        private val targets: Collection<Connection>
) : Runnable {
    val run = true
    private var next = 0

    private val timeline = mutableListOf<Message>()

    fun send(message: RoomMessage) {
        timeline += message
    }

    override fun run() {
        while(run) {
            if (timeline.size > next) {
                while (next < timeline.size) {
                    targets.forEach {
                        it.message(timeline[next])
                    }
                    next++
                }
            }
        }
    }
}