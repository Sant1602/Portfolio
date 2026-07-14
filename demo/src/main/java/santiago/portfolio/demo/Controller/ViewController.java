package santiago.portfolio.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import santiago.portfolio.demo.Dto.View.ViewResponseDto;
import santiago.portfolio.demo.Service.IViewService;

@RestController
@RequestMapping("/view")
public class ViewController {

    private final IViewService viewService;

    public ViewController(IViewService viewService) {
        this.viewService = viewService;
    }

    @GetMapping
    public ResponseEntity<ViewResponseDto> getViews() {
        return ResponseEntity.ok(viewService.getViews());
    }

}