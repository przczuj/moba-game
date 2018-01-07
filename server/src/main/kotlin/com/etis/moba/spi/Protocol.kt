package com.etis.moba.spi

interface Protocol {
    fun message(sender: Session, content: String): Message
    fun closeConnection(sender: Session): Message
}