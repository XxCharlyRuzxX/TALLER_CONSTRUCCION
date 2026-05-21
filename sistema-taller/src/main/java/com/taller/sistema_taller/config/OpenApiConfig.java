package com.taller.sistema_taller.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Mi Taller")
                        .version("1.0.0")
                        .description("Documentación automatizada de los endpoints del sistema 'Mi Taller'.")
                        .contact(new Contact()
                                .name("Eduardo Alexander Canto Paredes")
                                .email("eduardo.canto@taller.com")));
    }
}
