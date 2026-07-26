package santiago.portfolio.demo.Service;

import santiago.portfolio.demo.Dto.Notification.NotificationDto;

public interface INotificationService {

    void sendNotificacion(NotificationDto notification);
    
}
