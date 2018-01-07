package com.etis.moba.server.protocol

import com.etis.moba.spi.Message

class RoomMessage(val withRoom: Message) : Message {
    override val author: String = withRoom.author
    val roomId = withRoom.content.substringBefore(":")
    override val content: String = withRoom.content.substringAfter(":")

    override fun toString(): String {
        return withRoom.toString()
    }
}