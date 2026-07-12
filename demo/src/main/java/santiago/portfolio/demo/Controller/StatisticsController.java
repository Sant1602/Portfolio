package santiago.portfolio.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @GetMapping
    public ResponseEntity<Integer> getStatistics(){
        int h = 222550;
        return ResponseEntity.ok(h);
    }
    
}
