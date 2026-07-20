package santiago.portfolio.demo.Dto.View;

import java.time.LocalDateTime;

import santiago.portfolio.demo.Model.View;

public record ViewResponseDto(Long id, LocalDateTime visitedAt, String ip, String userAgent) {
    public ViewResponseDto(View view){
        this(view.getId(), view.getVisitedAt(), view.getIp(), view.getUserAgent());
    }
}
