package com.demo.shopping.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.demo.shopping.ShoppingConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter implements Filter {

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager)

	{
		super(authenticationManager);
		ShoppingConstants.LOGGER.info("start");
		ShoppingConstants.LOGGER.debug("{}: ", authenticationManager);

	}

	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		ShoppingConstants.LOGGER.info("Start");
		String header = req.getHeader("Authorization");
		ShoppingConstants.LOGGER.info(header);
		if (header == null || !header.startsWith("Bearer")) {
			ShoppingConstants.LOGGER.info("Inside if");
			chain.doFilter(req, res);
			return;
		}
		UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);
		ShoppingConstants.LOGGER.info("End");

	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		if (token != null) {
			Jws<Claims> jws;
			try {
				jws = Jwts.parser().setSigningKey("secretKey").parseClaimsJws(token.replace("Bearer ", ""));
				String user = jws.getBody().getSubject();
				ShoppingConstants.LOGGER.debug("" + jws);
				ShoppingConstants.LOGGER.debug("" + jws.getBody());
				ShoppingConstants.LOGGER.debug("" + jws.getBody().getSubject());
				ShoppingConstants.LOGGER.debug(user);
				if (user != null) {
					return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
				}

			} catch (JwtException ex) {
				return null;
			}
		}
		return null;
	}

}
