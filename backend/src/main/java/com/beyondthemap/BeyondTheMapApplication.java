package com.beyondthemap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class BeyondTheMapApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeyondTheMapApplication.class, args);
    }
}
