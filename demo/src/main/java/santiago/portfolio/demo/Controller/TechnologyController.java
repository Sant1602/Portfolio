package santiago.portfolio.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import santiago.portfolio.demo.Dto.Technology.TechnologyPostDto;
import santiago.portfolio.demo.Dto.Technology.TechnologyPutDto;
import santiago.portfolio.demo.Dto.Technology.TechnologyResponseDto;
import santiago.portfolio.demo.Service.ITechnologyService;

@RestController
@RequestMapping("/technology")
public class TechnologyController {

    private final ITechnologyService technologyService;

    public TechnologyController(ITechnologyService technologyService) {
        this.technologyService = technologyService;
    }

    @GetMapping
    public ResponseEntity<List<TechnologyResponseDto>> getTechnologies() {
        return ResponseEntity.ok(technologyService.getTechnologies());
    }

    @PostMapping
    public ResponseEntity<TechnologyResponseDto> postTechnology(@RequestBody TechnologyPostDto technologyPostDto) {
        TechnologyResponseDto technology = technologyService.createTechnology(technologyPostDto);
        return ResponseEntity.ok(technology);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TechnologyResponseDto> putTechnology(@PathVariable Long id, @RequestBody TechnologyPutDto technologyPutDto) {
        TechnologyResponseDto technology = technologyService.updateTechnology(id, technologyPutDto);
        return ResponseEntity.ok(technology);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnology(@PathVariable Long id) {
        technologyService.deleteTechnology(id);
        return ResponseEntity.noContent().build();
    }

}