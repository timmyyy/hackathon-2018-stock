package io.github.hackathon2018.stock.service;

import io.github.hackathon2018.stock.domain.Employee;
import io.github.hackathon2018.stock.domain.Task;
import io.github.hackathon2018.stock.repository.EmployeeRepository;
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

        Map<Double, List<Employee>> distanceToTask = new TreeMap<>((o1, o2) -> (-1) * o1.compareTo(o2));

        String[] words = keyWordSplitter(keyWords);
        for (Employee employee : employeeRepository.findAll()) {
            Double distance = (double) 0;
            for (Task task : employee.getCompletedTasks()) {
                String[] taskKeyWords = keyWordSplitter(task.getCommaSeparatedKeywords());
                for (String searchWord : words) {
                    for (String word : taskKeyWords) {
                        distance += calcDistance(searchWord, word);
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

        List<Employee> result = new ArrayList<>();
        for (List<Employee> employees : distanceToTask.values()) {
            result.addAll(employees);
        }
        return result;
    }

    private Double calcDistance(String left, String right) {
        if (left.length() == right.length()) {
            return left.equals(right) ? 1D : 0D;
        }
        if (left.length() > right.length()) {
            if (left.startsWith(right)) {
                return (double) right.length() / (double) left.length();
            } else {
                return 0D;
            }
        } else {
            if (right.startsWith(left)) {
                return (double) left.length() / (double) right.length();
            } else {
                return 0D;
            }
        }
    }


    private String[] keyWordSplitter(String keywords) {
        return Arrays.stream(keywords.toLowerCase().split(",")).map(String::trim).toArray(String[]::new);
    }
}
