package com.ip.payment.service;

import java.net.URL;
import java.net.HttpURLConnection;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.io.*;

public class CurrencyConverter {
    private final String URL_STR = "https://v3.exchangerate-api.com/bulk/04d30054b181f34e2589efba/USD";

    public CurrencyConverter() {
        super();
    }
    public Float getUsdRate( String currency ) {
        Float amount = 0.f;
        try {
            URL url = new URL(URL_STR);
            HttpURLConnection request = (HttpURLConnection) url.openConnection();
            request.connect();
            // Convert to JSON
            JsonParser jp = new JsonParser();
            JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent()));
            JsonObject jsonobj = root.getAsJsonObject();
            // Accessing object
            String req_result = jsonobj.get("result").getAsString();
            System.out.println(req_result);
            JsonObject exchangeValues = jsonobj.get("rates").getAsJsonObject();
            amount = 1/exchangeValues.get(currency).getAsFloat();
        } catch(Exception e) {
            e.printStackTrace();
        }
        return amount;
    }
}