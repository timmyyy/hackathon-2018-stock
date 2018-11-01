package io.github.hackathon2018.stock.integration.tomita;

import java.util.List;

public interface TomitaParser {
    List<String> getCases(String text, TomitaConfig config);
}
