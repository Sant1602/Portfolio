package santiago.portfolio.demo.Dto.Image;

import santiago.portfolio.demo.Model.Image;

public record ImageDtoResponse(String url, String alt, Integer displayOrder, Long projectId) {
    public ImageDtoResponse(Image image) {
        this(image.getUrl(),
                image.getAlt(),
                image.getDisplayOrder(),
                image.getProject().getId());
    }
}
