package io.github.hackathon2018.stock.integration.tomita;

import io.github.hackathon2018.stock.integration.tomita.dto.Facts;

public interface TomitaParser {
    Facts getFacts(String text);
}
