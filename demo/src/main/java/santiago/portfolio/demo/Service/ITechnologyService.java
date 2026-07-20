package santiago.portfolio.demo.Service;

import java.util.List;


import santiago.portfolio.demo.Dto.Technology.TechnologyPostDto;
import santiago.portfolio.demo.Dto.Technology.TechnologyPutDto;
import santiago.portfolio.demo.Dto.Technology.TechnologyResponseDto;

public interface ITechnologyService {

    List<TechnologyResponseDto> getTechnologies();
    TechnologyResponseDto createTechnology(TechnologyPostDto technologyPostDto);
    TechnologyResponseDto updateTechnology(Long id, TechnologyPutDto technologyPutDto);
    void deleteTechnology(Long id);

}
