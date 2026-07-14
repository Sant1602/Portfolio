package santiago.portfolio.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import santiago.portfolio.demo.Dto.Statistics.StatisticsResponseDto;
import santiago.portfolio.demo.Service.IStatisticsService;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {
    private final IStatisticsService statisticsService;

    public StatisticsController(IStatisticsService statisticsService){
        this.statisticsService = statisticsService;
    }

    @GetMapping
    public ResponseEntity<StatisticsResponseDto> getStatistics(){
        return ResponseEntity.ok(statisticsService.getAmount());
    }
    
}
