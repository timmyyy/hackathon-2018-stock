package io.github.hackathon2018.stock.integration.tomita;

import io.github.hackathon2018.stock.integration.tomita.cmd.TomitaCmdWrapper;

import static io.github.hackathon2018.stock.integration.tomita.TomitaCallType.CMD;

public class TomitaParserFactory {
    public static TomitaParser getInstance(TomitaCallType callType) {
        if (callType == CMD) {
            return new TomitaCmdWrapper();
        } else {
            throw new UnsupportedOperationException();
        }
    }
}
