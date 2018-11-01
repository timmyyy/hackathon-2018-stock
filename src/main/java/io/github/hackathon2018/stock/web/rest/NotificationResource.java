package io.github.hackathon2018.stock.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.hackathon2018.stock.domain.Notification;
import io.github.hackathon2018.stock.domain.Request;
import io.github.hackathon2018.stock.repository.EmployeeRepository;
import io.github.hackathon2018.stock.repository.NotificationRepository;
import io.github.hackathon2018.stock.repository.RequestRepository;
import io.github.hackathon2018.stock.service.dto.NotificationsToEmployeesDTO;
import io.github.hackathon2018.stock.web.rest.errors.BadRequestAlertException;
import io.github.hackathon2018.stock.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.*;

/**
 * REST controller for managing Notification.
 */
@RestController
@RequestMapping("/api")
public class NotificationResource {

    private final Logger log = LoggerFactory.getLogger(NotificationResource.class);

    private static final String ENTITY_NAME = "notification";

    private final NotificationRepository notificationRepository;
    private EmployeeRepository employeeRepository;
    private RequestRepository requestRepository;

    public NotificationResource(NotificationRepository notificationRepository,
                                EmployeeRepository employeeRepository,
                                RequestRepository requestRepository) {
        this.notificationRepository = notificationRepository;
        this.employeeRepository = employeeRepository;
        this.requestRepository = requestRepository;
    }

    /**
     * POST  /notifications : Create a new notification.
     *
     * @param notification the notification to create
     * @return the ResponseEntity with status 201 (Created) and with body the new notification, or with status 400 (Bad Request) if the notification has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notifications")
    @Timed
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) throws URISyntaxException {
        log.debug("REST request to save Notification : {}", notification);
        if (notification.getId() != null) {
            throw new BadRequestAlertException("A new notification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Notification result = notificationRepository.save(notification);
        return ResponseEntity.created(new URI("/api/notifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notifications : Updates an existing notification.
     *
     * @param notification the notification to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated notification,
     * or with status 400 (Bad Request) if the notification is not valid,
     * or with status 500 (Internal Server Error) if the notification couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notifications")
    @Timed
    public ResponseEntity<Notification> updateNotification(@RequestBody Notification notification) throws URISyntaxException {
        log.debug("REST request to update Notification : {}", notification);
        if (notification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Notification result = notificationRepository.save(notification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, notification.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notifications : get all the notifications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notifications in body
     */
    @GetMapping("/notifications")
    @Timed
    public List<Notification> getAllNotifications() {
        log.debug("REST request to get all Notifications");
        return notificationRepository.findAll();
    }

    /**
     * GET  /notifications/:id : get the "id" notification.
     *
     * @param id the id of the notification to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the notification, or with status 404 (Not Found)
     */
    @GetMapping("/notifications/{id}")
    @Timed
    public ResponseEntity<Notification> getNotification(@PathVariable Long id) {
        log.debug("REST request to get Notification : {}", id);
        Optional<Notification> notification = notificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(notification);
    }

    /**
     * DELETE  /notifications/:id : delete the "id" notification.
     *
     * @param id the id of the notification to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        log.debug("REST request to delete Notification : {}", id);

        notificationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/notificationsToEmployees")
    @Timed
    public ResponseEntity<Void> createNotificationsByEmployeeIds(@RequestBody NotificationsToEmployeesDTO dto) {
        log.debug("REST request createNotificationsByEmployeeIds : {}", dto);

        ArrayList<Notification> notifications = new ArrayList<>();
        StringBuilder employeeToLog = new StringBuilder();
        Optional<Request> request = requestRepository.findById(dto.getRequestId());

        employeeRepository.findAllById(dto.getEmployeeIds())
            .forEach(employee -> {
                employeeToLog.append(employee.getUsername()).append(" ");
                notifications.add(new Notification()
                    .employee(employee)
                    .request(request.orElse(null)));
            });

        notificationRepository.saveAll(notifications);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createAlert(ENTITY_NAME + "s for users:", employeeToLog.toString()))
            .build();
    }
}
