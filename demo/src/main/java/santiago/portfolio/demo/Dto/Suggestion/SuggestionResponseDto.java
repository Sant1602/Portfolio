package santiago.portfolio.demo.Dto.Suggestion;

import java.time.LocalDateTime;

import santiago.portfolio.demo.Enum.StatusMessage;
import santiago.portfolio.demo.Model.Suggestion;

public record SuggestionResponseDto(Long id, String name, String cellphoneNumber, String mail, String message,
        StatusMessage status, LocalDateTime createdAt) {

    public SuggestionResponseDto(Suggestion suggestion){
                this(suggestion.getId(), suggestion.getName(), suggestion.getCellphoneNumber(), suggestion.getMail(), suggestion.getMessage(), suggestion.getStatus(), suggestion.getCreatedAt());
            }
}


