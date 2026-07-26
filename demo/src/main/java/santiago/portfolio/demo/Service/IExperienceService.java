package santiago.portfolio.demo.Service;

import java.util.List;

import santiago.portfolio.demo.Dto.Experience.ExperiencePostDto;
import santiago.portfolio.demo.Dto.Experience.ExperiencePutDto;
import santiago.portfolio.demo.Dto.Experience.ExperienceResponseDto;

public interface IExperienceService {

    List<ExperienceResponseDto> getExperiences();

    ExperienceResponseDto createExperince(ExperiencePostDto experiencePostDto);

    ExperienceResponseDto updateExperience(Long id, ExperiencePutDto experiencePutDto);

    boolean deleteExperience(Long id);
}
