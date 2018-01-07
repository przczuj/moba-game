package com.etis.moba.server.protocol

import com.etis.moba.spi.Message

class RoomCommand(private val message: RoomMessage) : Message by message {
    val command = message.content.substringBefore(":")
    val arg = message.content.substringAfter(":")

    override fun toString(): String {
        return message.toString()
    }
}