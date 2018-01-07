package com.etis.moba.server

import com.etis.moba.server.room.Room
import com.etis.moba.spi.Message
import com.etis.moba.spi.Session
import java.time.Instant

class Connection(
        val start: Instant,
        private val session: Session
) {
    val id = session.toString()
    val rooms: MutableMap<String, Room> = mutableMapOf()
    var player: Player? = null
        private set

    fun isLoggedIn() = player != null

    fun login(player: Player) {
        this.player = player
    }

    fun logout() {
        this.player = null
    }

    fun join(room: Room) {
        rooms += room.id to room
    }

    fun leave(room: Room) {
        rooms.remove(room.id)
    }

    fun message(message: Message) {
        session.send(message)
    }

    fun close() {

    }
}
