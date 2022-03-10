package com.datahovel.webshop;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

import com.datahovel.webshop.config.KafkaConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;

import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

	Map<String,String> map;

	@GetMapping("/grey_cats")
	public List<Map<String, String>> getTopProducts() {
		List<Map<String,String>> products = new ArrayList<Map<String,String>>();
		KafkaConfig config = new KafkaConfig();
		Map<String, Object> consumerConfig = config.consumerConfigs();
		System.out.println(consumerConfig.get(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG));
		consumerConfig.put("group.id", "all-cats-consumer");
		KafkaConsumer<String, String> consumer = new KafkaConsumer<>(consumerConfig);
		consumer.subscribe(Collections.singletonList("products"));
		
			final ConsumerRecords<String,String> consumerRecords = consumer.poll(Duration.ofSeconds(1));
            consumerRecords.forEach(record -> {
				try {
					map = new ObjectMapper().readValue(record.value(), HashMap.class);
				} catch (JsonProcessingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				products.add(map);
                System.out.printf("Consumer Record:(%s, %s, %d, %d)\n",
                        record.key(), record.value(),
                        record.partition(), record.offset());
            });

            consumer.commitAsync();
			consumer.close();
			System.out.println("DONE");
        return products;
		}

    @PostMapping("/")

    @Deprecated
	@GetMapping("/all_cats")
	public List<Map<String, String>> getProducts() {
		List<Map<String,String>> products = new ArrayList<Map<String,String>>();
		map = new HashMap<String,String>();
		map.put("name", "Luna");
		map.put("price", "39.99");
		map.put("height", "251");
		map.put("width", "200");
		map.put("tag", "On Sale");
		products.add(map);
		map = new HashMap<String,String>();
		map.put("name", "Charlie");
		map.put("price", "42.99");
		map.put("height", "249");
		map.put("width", "200");
		map.put("tag", "");
		products.add(map);
		map = new HashMap<String,String>();
		map.put("name", "Loki");
		map.put("price", "52.99");
		map.put("height", "250");
		map.put("width", "201");
		map.put("tag", "Only 251 left");
		products.add(map);
		map = new HashMap<String,String>();
		map.put("name", "The cutest cat in the world. Period.");
		map.put("price", "62.99");
		map.put("height", "250");
		map.put("width", "199");
		map.put("tag", "new");
		products.add(map);
		return products;
	}
         

}
