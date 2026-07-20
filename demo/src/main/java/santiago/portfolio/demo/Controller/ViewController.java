package santiago.portfolio.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<List<ViewResponseDto>> getViews() {
        return ResponseEntity.ok(viewService.getViews());
    }

    @PostMapping
public ResponseEntity<Void> registerView(HttpServletRequest request) {
    viewService.registerView(request);
    return ResponseEntity.ok().build();
}
}