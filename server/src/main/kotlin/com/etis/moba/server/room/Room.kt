package com.etis.moba.server.room

import com.etis.moba.server.Connection
import com.etis.moba.server.protocol.RoomMessage

interface Room {

    val id: String

    fun closed(): Boolean

    fun message(connection: Connection, message: RoomMessage)
}