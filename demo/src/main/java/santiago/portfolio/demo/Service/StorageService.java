package santiago.portfolio.demo.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import santiago.portfolio.demo.Dto.Image.ImageDtoProject;

@Service
public class StorageService implements IStorageService {
    private Cloudinary cloudinary;

    public StorageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @SuppressWarnings("unchecked")
    @Override
    public ImageDtoProject save(MultipartFile file) {
        String extensions = null;
        String[] splitName = null;
        final List<String> allowedTypes = Arrays.asList("jpg", "jpeg", "png", "webp", "avif");
        if(file.getOriginalFilename() != null){
            splitName = file.getOriginalFilename().split("\\.");
            extensions = splitName[splitName.length -1];
        }
        if(!allowedTypes.contains(extensions)){
            throw new RuntimeException("Extension not Allowed");
        }
        try {
            Map<String, Object> resultUpload = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", "Portfolio"));
            return new ImageDtoProject(resultUpload.get("secure_url").toString(), splitName[1]);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar la imagen.", e);
        }
    }

    // @Override
    // public void delete(String fileName) {
    //     try {
    //         Files.deleteIfExists(uploadPath.resolve(fileName));
    //     } catch (IOException e) {
    //         throw new RuntimeException("No se pudo eliminar la imagen.", e);
    //     }
    // }

}
