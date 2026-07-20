package santiago.portfolio.demo.Dto.Technology;

import santiago.portfolio.demo.Model.Technology;

public record TechnologyPutDto (String name, String slug) {
    public void update(Technology technology){
        technology.setName(name);
        technology.setSlug(slug);
    }
}

