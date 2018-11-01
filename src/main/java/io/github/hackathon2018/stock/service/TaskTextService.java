package io.github.hackathon2018.stock.service;

import io.github.hackathon2018.stock.domain.Task;
import io.github.hackathon2018.stock.integration.tomita.TomitaParser;
import io.github.hackathon2018.stock.integration.tomita.TomitaParserFactory;
import io.github.hackathon2018.stock.integration.tomita.dto.Facts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Iterator;

import static io.github.hackathon2018.stock.integration.tomita.TomitaCallType.CMD;

@Service
public class TaskTextService {
    private final Logger log = LoggerFactory.getLogger(TaskTextService.class);

    public Task createTaskFromText(String text) {
        log.debug("==> createTaskFromText({})", text);

        TomitaParser parser = TomitaParserFactory.getInstance(CMD);
        Facts facts = parser.getFacts(text);
        Task task = new Task();

        if (facts.getSystems().size() > 0) {
            task.setSystem(facts.getSystems().get(0));
        }
        if (facts.getSubsystems().size() > 0) {
            task.setSubsystem(facts.getSubsystems().get(0));
        }
        if (facts.getKeywords().size() > 0) {
            StringBuilder keywordsBuilder = new StringBuilder();
            Iterator<String> iter = facts.getKeywords().iterator();
            while (iter.hasNext()) {
                keywordsBuilder.append(iter.next());
                if (iter.hasNext()) keywordsBuilder.append(",");
            }
            task.setCommaSeparatedKeywords(keywordsBuilder.toString());
        }

        log.debug("<== createTaskFromText() : {}", task);

        return task;
    }
}
