package santiago.portfolio.demo.Dto.Experience;

import santiago.portfolio.demo.Model.Experience;

public record ExperienceResponseDto(Long id, String position, String company, String location, String description) {
    public ExperienceResponseDto(Experience experience){
        this(experience.getId(), experience.getPosition(), experience.getCompany(), experience.getLocation(), experience.getDescription());
    }
}
