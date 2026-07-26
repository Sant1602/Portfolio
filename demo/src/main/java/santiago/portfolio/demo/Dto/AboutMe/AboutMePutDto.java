package santiago.portfolio.demo.Dto.AboutMe;

import santiago.portfolio.demo.Model.AboutMe;

public record AboutMePutDto(
        String name,
        String profession,
        String shortDescription,
        String description,
        String location,
        String cv,
        String github,
        String linkedin,
        Boolean availableForWork) {

            public void update(AboutMe aboutMe){
                aboutMe.setName(name);
                aboutMe.setProfession(profession);
                aboutMe.setShortDescription(shortDescription);
                aboutMe.setLocation(location);
                aboutMe.setCv(cv);
                aboutMe.setGithub(github);
                aboutMe.setLinkedin(linkedin);
                aboutMe.setAvailableForWork(availableForWork);
            }
        }
