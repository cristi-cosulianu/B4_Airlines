package com.ip.payment.service;

public class InsufficientFundsException extends Exception {
    private static final long serialVersionUID = 1L;
    /**
     *
     */
    
    private static final String INSUFICIENT_FUNDS = "Insuficient funds!";

    public InsufficientFundsException() {
        super(INSUFICIENT_FUNDS);
    }
}