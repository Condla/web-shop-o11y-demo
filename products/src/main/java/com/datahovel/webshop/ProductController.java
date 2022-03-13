package com.datahovel.webshop;

import java.rmi.ServerException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

import com.datahovel.webshop.kafka.Producer;
import com.datahovel.webshop.model.Product;
import com.datahovel.webshop.repository.ProductRepository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

	Logger logger = LoggerFactory.getLogger(ProductController.class);
     
	@Autowired
	private ProductRepository productRepository;
	Iterable<Product> products;
	Product product;

    private final Producer producer;

	@Autowired
	ProductController(Producer producer) {
		this.producer = producer;
	}


	@GetMapping("/")
	public Iterable<Product> getAllProducts() {

		products = productRepository.findAll();
		return products;
		}

	@PostMapping("/")
	public Product addProduct(@RequestBody Product product) throws ServerException {
		product = productRepository.save(product);
		if (product == null) {
			logger.error("Couldn't add product to database.");
			throw new ServerException("null");
		}
		else {
			return product;
		}
	}

    @PostMapping("/publish")
	public void sendToKafka(@RequestParam("message") String message) {
		this.producer.sendMessage(message);
	}
}
