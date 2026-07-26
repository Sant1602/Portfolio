package santiago.portfolio.demo.Dto.Suggestion;

import java.util.List;

public record SuggestionListResponseDto(int total, int read, int unread, List<SuggestionResponseDto> suggestions) {}
