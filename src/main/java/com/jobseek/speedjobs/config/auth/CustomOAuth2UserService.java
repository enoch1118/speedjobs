package com.jobseek.speedjobs.config.auth;

import java.util.Collections;

import javax.transaction.Transactional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.jobseek.speedjobs.domain.user.User;
import com.jobseek.speedjobs.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final UserRepository userRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
		OAuth2UserService delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(request);

		String registrationId = request.getClientRegistration().getRegistrationId();
		String userNameAttributeName = request.getClientRegistration().getProviderDetails()
			.getUserInfoEndpoint().getUserNameAttributeName();

		OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName,
			oAuth2User.getAttributes());

		User user = saveOrUpdateOAuthUser(attributes);

		return new DefaultOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString())),
			attributes.getAttributes(),
			attributes.getNameAttributeKey());
	}

	@Transactional
	public User saveOrUpdateOAuthUser(OAuthAttributes attributes) {
		User user = userRepository.findByProviderAndOauthId(attributes.getProvider(),
			attributes.getOauthId())
			.map(entity -> entity.updateOAuthUserInfo(attributes.getName(), attributes.getPicture()))
			.orElse(userRepository.existsByEmail(attributes.getEmail()) ? null : attributes.toEntity());

		if (user == null) {
			throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
		}

		return userRepository.save(user);
	}
}
