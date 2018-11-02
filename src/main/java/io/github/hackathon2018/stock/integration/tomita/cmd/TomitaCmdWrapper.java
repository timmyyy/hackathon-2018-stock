package io.github.hackathon2018.stock.integration.tomita.cmd;

import io.github.hackathon2018.stock.integration.tomita.TomitaParser;
import io.github.hackathon2018.stock.integration.tomita.cmd.util.UnZip;
import io.github.hackathon2018.stock.integration.tomita.dto.Facts;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TomitaCmdWrapper implements TomitaParser {
    private final Logger log = LoggerFactory.getLogger(TomitaCmdWrapper.class);

    private static final String TOMITA_DIR = "tomita";
    private static final String TOMITA_EXECUTABLE = "tomitaparser.exe";
    private static final String TOMITA_ZIP_FILENAME = TOMITA_DIR + ".zip";
    private static final String TOMITA_TMP_CONF_TEMPLATE = "config.proto.template";

    private static final String INPUT_FILE_PLACEHOLDER = "<input_file>";
    private static final String OUTPUT_FILE_PLACEHOLDER = "<output_file>";
    private static final String GZT_FILE_PLACEHOLDER = "<gzt_file>";
    private static final String DEBUG_FILE_PLACEHOLDER = "<debug_file>";

    private static final String TEMP_PREFIX = "task_stock";

    @Override
    public Facts getFacts(String text) {
        Document document = getFactsXmlResult(text);
        if (document == null) return new Facts();

        List<Node> nodes = document.selectNodes("/fdo_objects/document/facts/Target");

        Facts facts = new Facts();
        facts.setSystems(getNodeValues("system", nodes));
        facts.setSubsystems(getNodeValues("subsystem", nodes));
        facts.setKeywords(getNodeValues("keywords", nodes));

        return facts;
    }

    private List<String> getNodeValues(String nodeName, List<Node> nodes) {
        List<String> result = new ArrayList<>();
        for (Node node : nodes) {
            Node selectedNode = node.selectSingleNode(nodeName);
            if (selectedNode != null) {
                result.add(selectedNode.valueOf("@val"));
            }
        }
        return result;
    }

    private String createTmpTextFile(String text, String suffix) throws IOException {
        String rndFilename = UUID.randomUUID().toString().replace("-", "");
        File tempFile = new File("C:\\Temp\\" + rndFilename + suffix);
//        File tempFile = File.createTempFile(TEMP_PREFIX, suffix);
//        tempFile.deleteOnExit();
        BufferedOutputStream output = null;
        try {
            output = new BufferedOutputStream(new FileOutputStream(tempFile));
            output.write(text.getBytes("UTF-8"));
        } finally {
            if (output != null) {
                output.close();
            }
        }
        return tempFile.getPath();
    }

    private String createTmpConfigFile(String textFilename, String resultFilename, String gztFilename, String debugFilename) throws IOException {
        InputStream inputStream = Thread
            .currentThread()
            .getContextClassLoader()
            .getResourceAsStream(TOMITA_TMP_CONF_TEMPLATE);

        StringBuilder confTemplateBuilder = new StringBuilder();
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        String line;
        while ((line = br.readLine()) != null) {
            confTemplateBuilder.append(line);
        }

        String config = confTemplateBuilder
            .toString()
            .replace(INPUT_FILE_PLACEHOLDER, textFilename.replace("\\", "\\\\"))
            .replace(OUTPUT_FILE_PLACEHOLDER, resultFilename.replace("\\", "\\\\"))
            .replace(GZT_FILE_PLACEHOLDER, gztFilename.replace("\\", "\\\\"))
            .replace(DEBUG_FILE_PLACEHOLDER, debugFilename.replace("\\", "\\\\"));
        return createTmpTextFile(config, ".proto");
    }

    private String createGztFilename() {
        return getTomitaDir() + "mydic.gzt";
    }

    private String createDebugFilename() {
        return getTmpDir() + "debug.html";
    }

    private String getTmpResultFileName() throws IOException {
        File tempFile = File.createTempFile(TEMP_PREFIX, ".xml");
        tempFile.deleteOnExit();
        return tempFile.getPath();
    }

    private Document getFactsXmlResult(String text) {
        String textFilename = null;
        String resultFilename = null;
        String configFileName = null;
        String debugFilename = null;
        InputStream inputStream = null;
        try {
            textFilename = createTmpTextFile(text, ".txt");
            resultFilename = getTmpResultFileName();
            debugFilename = createDebugFilename();
            String gztFilename = createGztFilename();
            configFileName = createTmpConfigFile(textFilename, resultFilename, gztFilename, debugFilename);
            String command = getCmdLine(configFileName);
            log.debug("Command line: " + command);
            execCmd(command);
            inputStream = new FileInputStream(resultFilename);
            SAXReader reader = new SAXReader();
            return reader.read(inputStream);
        } catch (Exception ex) {
            log.error("Error while execute " + TOMITA_EXECUTABLE, ex.getMessage(), ex);
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (textFilename != null) {
                    (new File(textFilename)).delete();
                }
                if (resultFilename != null) {
                    (new File(resultFilename)).delete();
                }
                if (configFileName != null) {
                    (new File(configFileName)).delete();
                }
                if (debugFilename != null) {
                    (new File(debugFilename)).delete();
                }
            } catch (Exception ex) {
                log.warn("Unable to delete temporary files: " + ex.getMessage(), ex);
            }
        }
        return null;
    }

    private void execCmd(String cmd) {
        try {
            String line;
            Process p = Runtime.getRuntime().exec(cmd);
            BufferedReader bri = new BufferedReader
                (new InputStreamReader(p.getInputStream()));
            BufferedReader bre = new BufferedReader
                (new InputStreamReader(p.getErrorStream()));
            while ((line = bri.readLine()) != null) {
                log.info(line);
            }
            bri.close();
            while ((line = bre.readLine()) != null) {
                log.info(line);
            }
            bre.close();
            p.waitFor();
            log.info("Done.");
        }
        catch (Exception err) {
            err.printStackTrace();
        }
    }

    private String getCmdLine(String configFileName) throws IOException {
        String execPath = getTomitaDir() + TOMITA_EXECUTABLE;

        if (!(new File(execPath)).exists()) {
            unzipProgram();
        }
        return "\"" + execPath + "\" \"" + configFileName + "\"";
    }

    private String getTomitaDir() {
        return getTmpDir() + TOMITA_DIR + "/";
    }

    private String getTmpDir() {
        return "C:\\Temp\\";
//        String tmpDir = System.getProperty("java.io.tmpdir");
//
//        StringBuilder execPathBuilder = new StringBuilder(tmpDir);
//        if (!tmpDir.endsWith("/") && !tmpDir.endsWith("\\")) {
//            execPathBuilder.append("/");
//        }
//        return execPathBuilder.toString();
    }

    private void unzipProgram() throws IOException {
        InputStream input = Thread.currentThread().getContextClassLoader().getResourceAsStream(TOMITA_ZIP_FILENAME);
        UnZip unZip = new UnZip();
        unZip.setMode(UnZip.EXTRACT);
        unZip.setBaseDir(getTmpDir());
        unZip.unZip(input);
    }

    public static void main(String args[]) {
        TomitaCmdWrapper w = new TomitaCmdWrapper();
        Facts facts = w.getFacts("Необходимо доработать АС ФС для интеграции с ЕРИБ");
        System.out.println(facts);
    }
}
