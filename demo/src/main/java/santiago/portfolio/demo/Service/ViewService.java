package santiago.portfolio.demo.Service;

import java.time.LocalDateTime;
import java.util.List;


import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import santiago.portfolio.demo.Dto.View.ViewResponseDto;
import santiago.portfolio.demo.Mappers.ListMappers;
import santiago.portfolio.demo.Model.View;
import santiago.portfolio.demo.Repository.ViewRepository;

@Service
public class ViewService implements IViewService {
    private final ViewRepository viewRepository;

    public ViewService(ViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    @Override
    public List<ViewResponseDto> getViews() {
        return ListMappers.toDto(viewRepository.findAll(), ViewResponseDto::new);
    }

    @Override
    public void registerView(HttpServletRequest request) {
        String ip = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");

        boolean alreadyVisited = viewRepository.existsByIpAndVisitedAtAfter(
                ip,
                LocalDateTime.now().minusHours(24));

        if (alreadyVisited) {
            return;
        }
        View view = new View(ip, userAgent);
        viewRepository.save(view);
    }

    private String getClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();

    }
}
