package santiago.portfolio.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import santiago.portfolio.demo.Dto.AboutMe.AboutMePostDto;
import santiago.portfolio.demo.Dto.AboutMe.AboutMePutDto;
import santiago.portfolio.demo.Dto.AboutMe.AboutMeResponseDto;
import santiago.portfolio.demo.Service.IAboutMeService;

@RestController
@RequestMapping("/about-me")
public class AboutMeController {

    private final IAboutMeService aboutMeService;

    public AboutMeController(IAboutMeService aboutMeService) {
        this.aboutMeService = aboutMeService;
    }

    @GetMapping
    public ResponseEntity<AboutMeResponseDto> getAboutMe() {
        return ResponseEntity.ok(aboutMeService.getAboutMe());
    }

    @PostMapping
    public ResponseEntity<AboutMeResponseDto> createAboutMe(@RequestBody AboutMePostDto aboutMePostDto) {
        return ResponseEntity.ok(
                aboutMeService.createAboutMe(aboutMePostDto)
        );
    }

    @PutMapping
    public ResponseEntity<AboutMeResponseDto> updateAboutMe(@RequestBody AboutMePutDto aboutMePutDto) {
        return ResponseEntity.ok(
                aboutMeService.updateAboutMe(aboutMePutDto)
        );
    }
}