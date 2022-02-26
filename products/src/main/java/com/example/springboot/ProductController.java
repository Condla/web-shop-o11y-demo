package com.example.springboot;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

	Map<String,String> map;

	@GetMapping("/products/grey_cats")
	public List getProducts() {
		List<Map> products = new ArrayList();
		map = new HashMap();
		map.put("name", "Luna");
		map.put("price", "39.99");
		map.put("height", "251");
		map.put("width", "200");
		map.put("tag", "On Sale");
		products.add(map);
		map = new HashMap();
		map.put("name", "Charie");
		map.put("price", "42.99");
		map.put("height", "249");
		map.put("width", "200");
		map.put("tag", "");
		products.add(map);
		map = new HashMap();
		map.put("name", "Loki");
		map.put("price", "52.99");
		map.put("height", "250");
		map.put("width", "201");
		map.put("tag", "Only 251 left");
		products.add(map);
		map = new HashMap();
		map.put("name", "The cutest cat in the world. Period.");
		map.put("price", "62.99");
		map.put("height", "250");
		map.put("width", "199");
		map.put("tag", "new");
		products.add(map);
		return products;
	}

}
