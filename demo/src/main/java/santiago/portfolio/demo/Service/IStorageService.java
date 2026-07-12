package santiago.portfolio.demo.Service;

import org.springframework.web.multipart.MultipartFile;

public interface IStorageService {

    String save(MultipartFile file);
    void delete(String fileName);
}
