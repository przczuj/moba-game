package com.etis.moba.spi

interface Session {
    fun send(message: Message)
    override fun toString(): String
}