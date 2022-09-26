package com.coc.services;

import java.util.function.Supplier;

public interface EmailService {
	public void sendSimpleEmail(String toAddress, String subject, String message);
	public String generateFourDigitOtp();
}
