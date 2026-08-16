package santiago.portfolio.demo.Service;

import org.springframework.web.multipart.MultipartFile;

import santiago.portfolio.demo.Dto.Image.ImageDtoProject;

public interface IStorageService {

    ImageDtoProject save(MultipartFile file);

    void delete(String fileName);
}
