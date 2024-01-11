package ma.fstt.backend.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

public interface RepositoryRestConfigurer {
    void configureJacksonObjectMapper(ObjectMapper objectMapper);
}
