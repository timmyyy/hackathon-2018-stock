package io.github.hackathon2018.stock.service;

import io.github.hackathon2018.stock.repository.NotificationRepository;
import io.github.hackathon2018.stock.service.dto.NotificationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for notifications
 */
@Service
@Transactional
public class NotificationService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Send notification
     * @param notification
     */
    public void sendNotification(NotificationDTO notification) {

    }
}
