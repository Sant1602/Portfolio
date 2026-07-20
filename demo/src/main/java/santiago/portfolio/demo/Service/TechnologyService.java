package santiago.portfolio.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import santiago.portfolio.demo.Dto.Technology.TechnologyPostDto;
import santiago.portfolio.demo.Dto.Technology.TechnologyPutDto;
import santiago.portfolio.demo.Dto.Technology.TechnologyResponseDto;
import santiago.portfolio.demo.Model.Image;
import santiago.portfolio.demo.Model.Technology;
import santiago.portfolio.demo.Repository.TechnologyRepository;

@Service
public class TechnologyService implements ITechnologyService {

    private final TechnologyRepository technologyRepository;
    private final StorageService storageService;

    public TechnologyService(TechnologyRepository technologyRepository, StorageService storageService) {
        this.technologyRepository = technologyRepository;
        this.storageService = storageService;
    }

    @Override
    public List<TechnologyResponseDto> getTechnologies() {
        return technologyRepository.findAll().stream().map(TechnologyResponseDto::new).toList();
    }

    @Override
    public TechnologyResponseDto createTechnology(TechnologyPostDto technologyPostDto) {
        Technology technology = new Technology(technologyPostDto.name(), technologyPostDto.slug());
        technologyRepository.save(technology);
        return new TechnologyResponseDto(technology);
    }

    @Override
    public TechnologyResponseDto updateTechnology(Long id, TechnologyPutDto technologyPutDto) {
        Technology technology = technologyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tecnologia no encontrada"));
        technologyPutDto.update(technology);
        technologyRepository.save(technology);
        return new TechnologyResponseDto(technology);
    }

    @Override
    public void deleteTechnology(Long id) {
        Technology technology = technologyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tecnologia no encontrada"));
        technologyRepository.delete(technology);

    }

}
