package santiago.portfolio.demo.Service;

import org.springframework.stereotype.Service;

import santiago.portfolio.demo.Dto.AboutMe.AboutMePostDto;
import santiago.portfolio.demo.Dto.AboutMe.AboutMePutDto;
import santiago.portfolio.demo.Dto.AboutMe.AboutMeResponseDto;
import santiago.portfolio.demo.Model.AboutMe;
import santiago.portfolio.demo.Repository.AboutMeRepository;

@Service
public class AboutMeService implements IAboutMeService {

    private final AboutMeRepository aboutMeRepository;

    public AboutMeService(AboutMeRepository aboutMeRepository) {
        this.aboutMeRepository = aboutMeRepository;
    }

    @Override
    public AboutMeResponseDto getAboutMe() {
        AboutMe aboutMe = aboutMeRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No existe información del perfil."));
        return new AboutMeResponseDto(aboutMe);
    }

    @Override
    public AboutMeResponseDto createAboutMe(AboutMePostDto aboutMePostDto) {
        if (aboutMeRepository.count() > 0) {
            throw new RuntimeException("Ya existe un registro de About Me.");
        }
        AboutMe aboutMe = new AboutMe(aboutMePostDto.name(), aboutMePostDto.profession(), aboutMePostDto.shortDescription(), aboutMePostDto.description(), aboutMePostDto.location(), aboutMePostDto.cv(), aboutMePostDto.github(), aboutMePostDto.linkedin(), aboutMePostDto.availableForWork());
        return new AboutMeResponseDto(aboutMeRepository.save(aboutMe));
    }

    @Override
    public AboutMeResponseDto updateAboutMe(AboutMePutDto aboutMePutDto) {
        AboutMe aboutMe = aboutMeRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No existe información del perfil."));
        aboutMePutDto.update(aboutMe);
        return new AboutMeResponseDto(aboutMeRepository.save(aboutMe));
    }
}