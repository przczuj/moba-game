package com.etis.moba.server.protocol

import com.etis.moba.spi.Message
import com.etis.moba.spi.Protocol
import com.etis.moba.spi.Session

class GameProtocol(
        val rootRoom: String
) : Protocol {
    val joinRoom = "HELLO"
    val exitRoom = "BYE"

    override fun message(sender: Session, content: String): Message {
        return GameMessage(sender.toString(), content)
    }

    override fun closeConnection(sender: Session): Message {
        return GameMessage(sender.toString(), "$rootRoom:$exitRoom:$rootRoom")
    }

    private class GameMessage(
            override val author: String,
            override val content: String
    ) : Message {

        override fun toString(): String {
            return "$author:$content"
        }
    }
}