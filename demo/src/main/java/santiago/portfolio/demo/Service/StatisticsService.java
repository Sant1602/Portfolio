package santiago.portfolio.demo.Service;

import org.springframework.stereotype.Service;

import santiago.portfolio.demo.Dto.Statistics.StatisticsResponseDto;
import santiago.portfolio.demo.Repository.ProjectRepository;
import santiago.portfolio.demo.Repository.SkillRepository;
import santiago.portfolio.demo.Repository.TechnologyRepository;
import santiago.portfolio.demo.Repository.ViewRepository;

@Service
public class StatisticsService implements IStatisticsService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final TechnologyRepository technologyRepository;
    private final ViewRepository viewRepository;

    public StatisticsService(ProjectRepository projectRepository, SkillRepository skillRepository,
            TechnologyRepository technologyRepository, ViewRepository viewRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.technologyRepository = technologyRepository;
        this.viewRepository = viewRepository;
    }

    @Override
    public StatisticsResponseDto getAmount() {

        return new StatisticsResponseDto(
                (int) projectRepository.count(),
                (int) skillRepository.count(),
                (int) technologyRepository.count(),
                (int) viewRepository.count());
    }
}
