package com.datahovel.webshop.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class Producer {
    private static final Logger logger = LoggerFactory.getLogger(Producer.class);
    private static final String TOPIC = "shopping_cart_stream";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String message) {
        logger.info(String.format("Checked out shopping cart: ", message));
        this.kafkaTemplate.send(TOPIC, message);
    }
}
