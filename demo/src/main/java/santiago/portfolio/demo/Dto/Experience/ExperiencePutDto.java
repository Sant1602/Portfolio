package santiago.portfolio.demo.Dto.Experience;

import santiago.portfolio.demo.Model.Experience;

public record ExperiencePutDto(String position, String company, String location, String description) {
    public void update(Experience experince){
        experince.setPosition(position);
        experince.setCompany(company);
        experince.setLocation(location);
        experince.setDescription(description);
    }
}
