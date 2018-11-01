package io.github.hackathon2018.stock.service;

import io.github.hackathon2018.stock.domain.Performers;
import io.github.hackathon2018.stock.domain.Task;
import io.github.hackathon2018.stock.repository.PerformersRepository;
import org.apache.commons.text.similarity.JaccardSimilarity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Service class for performers
 */
@Service
@Transactional
public class PerformersService {

    private final Logger log = LoggerFactory.getLogger(PerformersService.class);

    private final PerformersRepository performersRepository;

    public PerformersService(PerformersRepository performersRepository) {
        this.performersRepository = performersRepository;
    }

    /**
     * Search performers
     *
     * @param task
     * @return
     */
    public List<Performers> search(Task task) {
        log.debug("Search performers by task = " + task);

        return search(task.getCommaSeparatedKeywords());
    }

    public List<Performers> search(String keyWords) {
        log.debug("Search performers by keyWords = " + keyWords);

        JaccardSimilarity jaccardSimilarity = new JaccardSimilarity();
        Map<Double, List<Performers>> distanceToTask = new TreeMap<>();

        String[] words = keyWordSplitter(keyWords);
        for (Performers performers : performersRepository.findAll()) {
            Double distance = (double) 0;
            for (Task task : performers.getEmployee().getCompletedTasks()) {
                String[] taskKeyWords = keyWordSplitter(task.getCommaSeparatedKeywords());
                for (String searchWord : words) {
                    for (String word : taskKeyWords) {
                        distance += jaccardSimilarity.apply(searchWord, word);
                    }
                }
            }
            List<Performers> performersList = distanceToTask.get(distance);
            if (performersList != null) {
                performersList.add(performers);
            } else {
                List<Performers> newList = new ArrayList<>();
                newList.add(performers);
                distanceToTask.put(distance, newList);
            }
        }

        List<Performers> employeeList = new ArrayList(distanceToTask.values());
        if (employeeList.size() != 0) {
            Collections.reverse(employeeList);
        }
        return employeeList;
    }

    private String[] keyWordSplitter(String keywords) {
        return Arrays.stream(keywords.toLowerCase().split(",")).map(String::trim).toArray(String[]::new);
    }
}
