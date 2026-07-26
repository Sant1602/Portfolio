package santiago.portfolio.demo.Dto.AboutMe;

import santiago.portfolio.demo.Model.AboutMe;

public record AboutMeResponseDto(

        Long id,
        String name,
        String profession,
        String shortDescription,
        String description,
        String location,
        String cv,
        String github,
        String linkedin,
        Boolean availableForWork

) {

    public AboutMeResponseDto(AboutMe aboutMe) {
        this(
                aboutMe.getId(),
                aboutMe.getName(),
                aboutMe.getProfession(),
                aboutMe.getShortDescription(),
                aboutMe.getDescription(),
                aboutMe.getLocation(),
                aboutMe.getCv(),
                aboutMe.getGithub(),
                aboutMe.getLinkedin(),
                aboutMe.getAvailableForWork()
        );
    }
}