package santiago.portfolio.demo.Service;

import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.annotation.PostConstruct;
import santiago.portfolio.demo.Dto.Image.ImageDtoProject;

import org.springframework.util.StringUtils;
import java.nio.file.*;

@Service
public class StorageService implements IStorageService {
    @Value("${file.upload-dir}")
    private String uploadDir;

    private Path uploadPath;

    @PostConstruct
    public void init() throws IOException {
        uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);
    }

    @Override
    public ImageDtoProject save(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("El archivo está vacío.");
            }
            String altFileName = file.getOriginalFilename();
            String extension = StringUtils.getFilenameExtension(altFileName);
            String fileName = UUID.randomUUID().toString();
            if (extension != null && !extension.isBlank()) {
                fileName += "." + extension;
            }
            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(fileName),
                    StandardCopyOption.REPLACE_EXISTING);
            return new ImageDtoProject(fileName, altFileName);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar la imagen.", e);
        }
    }

    @Override
    public void delete(String fileName) {
        try {
            Files.deleteIfExists(uploadPath.resolve(fileName));
        } catch (IOException e) {
            throw new RuntimeException("No se pudo eliminar la imagen.", e);
        }
    }

}
