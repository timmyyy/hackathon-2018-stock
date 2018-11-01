package io.github.hackathon2018.stock.integration.tomita.cmd;

import io.github.hackathon2018.stock.integration.tomita.TomitaConfig;
import io.github.hackathon2018.stock.integration.tomita.TomitaParser;
import io.github.hackathon2018.stock.integration.tomita.cmd.util.UnZip;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class TomitaCmdWrapper implements TomitaParser {
    private static final String TOMITA_ZIP_FILENAME = "tomita.zip";



    private static void unzipProgram() throws IOException {
        InputStream input = Thread.currentThread().getContextClassLoader().getResourceAsStream(TOMITA_ZIP_FILENAME);
        UnZip unZip = new UnZip();
        unZip.setMode(UnZip.EXTRACT);
        unZip.setBaseDir(System.getProperty("java.io.tmpdir"));
        unZip.unZip(input);
    }

    @Override
    public List<String> getCases(String text, TomitaConfig config) {
        return null;
    }
}
