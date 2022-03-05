package com.example.springboot;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {

			System.out.println("Application started successfully");

		};
	}

        @Bean
        public CommonsRequestLoggingFilter requestLoggingFilter() {
	        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
	        loggingFilter.setIncludeClientInfo(true);
	        loggingFilter.setIncludeQueryString(true);
	        loggingFilter.setIncludePayload(true);
	        loggingFilter.setIncludeHeaders(true);
	        return loggingFilter;
        }

}
