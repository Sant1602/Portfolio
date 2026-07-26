package santiago.portfolio.demo.Dto.AboutMe;

public record AboutMePostDto(
        String name,
        String profession,
        String shortDescription,
        String description,
        String location,
        String cv,
        String github,
        String linkedin,
        Boolean availableForWork

) {}