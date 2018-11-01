package io.github.hackathon2018.stock.service;

import io.github.hackathon2018.stock.domain.Employee;
import io.github.hackathon2018.stock.domain.Performers;
import io.github.hackathon2018.stock.domain.Task;
import io.github.hackathon2018.stock.repository.EmployeeRepository;
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
public class EmployeeService {

    private final Logger log = LoggerFactory.getLogger(EmployeeService.class);

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Search performers
     *
     * @param task
     * @return
     */
    public List<Employee> search(Task task) {
        log.debug("Search performers by task = " + task);

        return search(task.getCommaSeparatedKeywords());
    }

    public List<Employee> search(String keyWords) {
        log.debug("Search performers by keyWords = " + keyWords);

        JaccardSimilarity jaccardSimilarity = new JaccardSimilarity();
        Map<Double, List<Employee>> distanceToTask = new TreeMap<>();

        String[] words = keyWordSplitter(keyWords);
        for (Employee employee : employeeRepository.findAll()) {
            Double distance = (double) 0;
            for (Task task : employee.getCompletedTasks()) {
                String[] taskKeyWords = keyWordSplitter(task.getCommaSeparatedKeywords());
                for (String searchWord : words) {
                    for (String word : taskKeyWords) {
                        distance += jaccardSimilarity.apply(searchWord, word);
                    }
                }
            }
            List<Employee> employeeList = distanceToTask.get(distance);
            if (employeeList != null) {
                employeeList.add(employee);
            } else {
                if (distance > 0) {
                    List<Employee> newList = new ArrayList<>();
                    newList.add(employee);
                    distanceToTask.put(distance, newList);
                }
            }
        }

        List<Employee> employeeList = new ArrayList(distanceToTask.values());
        if (employeeList.size() != 0) {
            Collections.reverse(employeeList);
        }
        return employeeList;
    }

    private String[] keyWordSplitter(String keywords) {
        return Arrays.stream(keywords.toLowerCase().split(",")).map(String::trim).toArray(String[]::new);
    }
}
