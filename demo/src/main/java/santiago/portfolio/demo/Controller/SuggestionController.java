package santiago.portfolio.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;

import santiago.portfolio.demo.Dto.Suggestion.SuggestionListResponseDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionPatchDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionPostDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionResponseDto;
import santiago.portfolio.demo.Enum.StatusMessage;
import santiago.portfolio.demo.Service.ISuggestionService;

@RestController
@RequestMapping("/suggestion")
public class SuggestionController {
    private ISuggestionService suggestionService;

    public SuggestionController(ISuggestionService suggestionService){
        this.suggestionService = suggestionService;
    }
    
    @GetMapping
    public ResponseEntity<SuggestionListResponseDto> getSuggestions(@RequestParam(name = "filter", required = false) StatusMessage filter){
        return ResponseEntity.ok(suggestionService.getSuggestions(filter));
    }

    @PatchMapping
    public ResponseEntity<Boolean> changeStatus(@RequestBody SuggestionPatchDto suggestionPatchDto){
        return ResponseEntity.ok(suggestionService.setStatus(suggestionPatchDto));
    }

    @PostMapping
    public ResponseEntity<SuggestionResponseDto> createSuggestion(@RequestBody SuggestionPostDto suggestionPostDto){
        return ResponseEntity.ok(suggestionService.createSuggestion(suggestionPostDto));
    }
}
