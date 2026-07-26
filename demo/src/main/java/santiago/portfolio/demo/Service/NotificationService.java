package santiago.portfolio.demo.Service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import santiago.portfolio.demo.Dto.Notification.NotificationDto;

@Service
public class NotificationService implements INotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void sendNotificacion(NotificationDto notification) {
        messagingTemplate.convertAndSend(
                "/topic/notifications",
                notification
        );

    }

}