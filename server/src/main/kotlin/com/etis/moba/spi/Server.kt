package com.etis.moba.spi

interface Server {
    val protocol: Protocol
    fun newConnection(session: Session)
    fun recvMessage(message: Message)
}
