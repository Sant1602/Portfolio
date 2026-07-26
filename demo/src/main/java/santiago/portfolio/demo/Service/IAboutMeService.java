package santiago.portfolio.demo.Service;

import santiago.portfolio.demo.Dto.AboutMe.AboutMePostDto;
import santiago.portfolio.demo.Dto.AboutMe.AboutMePutDto;
import santiago.portfolio.demo.Dto.AboutMe.AboutMeResponseDto;

public interface IAboutMeService {

    AboutMeResponseDto getAboutMe();

    AboutMeResponseDto createAboutMe(AboutMePostDto aboutMePostDto);

    AboutMeResponseDto updateAboutMe(AboutMePutDto aboutMePutDto);

}