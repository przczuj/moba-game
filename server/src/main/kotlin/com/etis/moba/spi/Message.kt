package com.etis.moba.spi

interface Message {
    val author: String
    val content: String
    override fun toString(): String
}