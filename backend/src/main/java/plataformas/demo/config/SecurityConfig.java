package plataformas.demo.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors()
                .and()
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/registro").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/logoutSuccess").permitAll()
                .antMatchers("/logged").permitAll()
                .antMatchers("/alquilada").hasAuthority("USER")
                .antMatchers(HttpMethod.GET, "/pelicula").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/pelicula").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/pelicula").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .headers().frameOptions().sameOrigin()
                .and()
                .logout()
                .logoutSuccessUrl("/logoutSuccess")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID"); 

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public AuthenticationManager getAuthenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class).build();
    }

}
