package com.etis.moba.server.protocol

import com.etis.moba.spi.Message
import java.time.Instant

class TimedMessage(
        val time: Instant,
        val message: Message
) : Message by message {
    override fun toString(): String {
        return "$author:$time:$content"
    }
}
