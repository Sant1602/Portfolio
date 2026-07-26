package santiago.portfolio.demo.Service;


import santiago.portfolio.demo.Dto.Suggestion.SuggestionListResponseDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionPatchDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionPostDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionResponseDto;
import santiago.portfolio.demo.Enum.StatusMessage;


public interface ISuggestionService {

    SuggestionListResponseDto getSuggestions(StatusMessage filter);
    Boolean setStatus(SuggestionPatchDto suggestionPatchDto);
    SuggestionResponseDto createSuggestion(SuggestionPostDto suggestionPostDto);
}
