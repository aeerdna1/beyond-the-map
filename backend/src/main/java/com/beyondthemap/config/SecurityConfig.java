package com.beyondthemap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Public: GET content + POST inquiries. Admin: /api/admin/** via HTTP Basic.
 * Stateless JSON API, so CSRF protection (cookie-based) is not needed.
 */
@Configuration
@EnableAsync
@EnableScheduling
public class SecurityConfig {

    /** Placeholder shipped in application.yml; only acceptable with the local "dev" profile. */
    static final String DEFAULT_ADMIN_PASSWORD = "change-me";
    static final int MIN_ADMIN_PASSWORD_LENGTH = 12;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/api/destinations", "/api/destinations/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/inquiries").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/error").permitAll()
                        .anyRequest().denyAll())
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService users(AppProperties props, PasswordEncoder encoder, Environment env) {
        requireStrongAdminPassword(props.admin().password(), env.acceptsProfiles(Profiles.of("dev")));
        return new InMemoryUserDetailsManager(User.withUsername(props.admin().username())
                .password(encoder.encode(props.admin().password()))
                .roles("ADMIN")
                .build());
    }

    /**
     * Fails startup when the admin password is missing, still the shipped default, or too short,
     * unless the local "dev" profile is active. This stops a deploy that forgot ADMIN_PASSWORD
     * from exposing the admin API with a publicly known password.
     */
    static void requireStrongAdminPassword(String password, boolean devProfile) {
        if (devProfile) {
            return;
        }
        if (password == null || password.isBlank() || DEFAULT_ADMIN_PASSWORD.equals(password)
                || password.length() < MIN_ADMIN_PASSWORD_LENGTH) {
            throw new IllegalStateException("ADMIN_PASSWORD must be set to a strong value (at least "
                    + MIN_ADMIN_PASSWORD_LENGTH + " characters, not the default) unless the dev profile is active");
        }
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(AppProperties props) {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(props.corsOrigins() == null ? List.of() : props.corsOrigins());
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        cfg.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", cfg);
        return source;
    }
}
