package com.datahovel.webshop;

import java.rmi.ServerException;

import com.datahovel.webshop.kafka.Producer;
import com.datahovel.webshop.model.Product;
import com.datahovel.webshop.repository.ProductRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    private final Producer producer;
	ObjectMapper objectMapper = new ObjectMapper();

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

    @PostMapping("/checkout")
	public void sendToKafka(@RequestBody String message) throws JsonProcessingException {
		logger.info(message);
		this.producer.sendMessage(message);
	}
}
