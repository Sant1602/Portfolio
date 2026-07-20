package santiago.portfolio.demo.Service;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import santiago.portfolio.demo.Dto.View.ViewResponseDto;

public interface IViewService {
    List<ViewResponseDto> getViews();
    void registerView(HttpServletRequest request);

    
}
