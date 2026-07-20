package santiago.portfolio.demo.Dto.Technology;

import santiago.portfolio.demo.Model.Technology;

public record TechnologyResponseDto(Long id, String name, String slug) {
    public TechnologyResponseDto(Technology technology){
        this(technology.getId(), technology.getName(), technology.getSlug());
    }
}
