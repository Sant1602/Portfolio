package santiago.portfolio.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import santiago.portfolio.demo.Dto.Experience.ExperiencePostDto;
import santiago.portfolio.demo.Dto.Experience.ExperiencePutDto;
import santiago.portfolio.demo.Dto.Experience.ExperienceResponseDto;
import santiago.portfolio.demo.Mappers.ListMappers;
import santiago.portfolio.demo.Model.Experience;
import santiago.portfolio.demo.Repository.ExperienceRepository;

@Service
public class ExperienceService implements IExperienceService {
    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<ExperienceResponseDto> getExperiences() {
        return ListMappers.toDto(experienceRepository.findAll(), ExperienceResponseDto::new);

    }

    public ExperienceResponseDto createExperince(ExperiencePostDto experiencePostDto) {
        Experience experience = new Experience(experiencePostDto.position(), experiencePostDto.company(),
                experiencePostDto.location(), experiencePostDto.description());
        return new ExperienceResponseDto(experienceRepository.save(experience));

    }

    public ExperienceResponseDto updateExperience(Long id, ExperiencePutDto experiencePutDto) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontro la experiencia que desea editar"));
        experiencePutDto.update(experience);
        return new ExperienceResponseDto(experienceRepository.save(experience));

    }

    public boolean deleteExperience(Long id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontro la experiencia que desea eliminar"));
        experienceRepository.delete(experience);
        return true;
    }

}
