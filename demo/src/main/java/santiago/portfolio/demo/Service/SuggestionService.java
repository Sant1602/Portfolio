package santiago.portfolio.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import santiago.portfolio.demo.Dto.Notification.NotificationDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionListResponseDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionPatchDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionPostDto;
import santiago.portfolio.demo.Dto.Suggestion.SuggestionResponseDto;
import santiago.portfolio.demo.Enum.StatusMessage;
import santiago.portfolio.demo.Mappers.ListMappers;
import santiago.portfolio.demo.Model.Suggestion;
import santiago.portfolio.demo.Repository.SuggestionRepository;

@Service
public class SuggestionService implements ISuggestionService {

    private final SuggestionRepository suggestionRepository;
    private final INotificationService notificationService;

    public SuggestionService(SuggestionRepository suggestionRepository, INotificationService notificationService) {
        this.suggestionRepository = suggestionRepository;
        this.notificationService = notificationService;
    }

    @Override
    public SuggestionListResponseDto getSuggestions(StatusMessage filter) {

        List<SuggestionResponseDto> suggestions = ListMappers.toDto(
                suggestionRepository.findAll(),
                SuggestionResponseDto::new);

        long read = suggestions.stream()
                .filter(s -> s.status() == StatusMessage.Leido)
                .count();

        long unread = suggestions.stream()
                .filter(s -> s.status() == StatusMessage.No_leido)
                .count();

        List<SuggestionResponseDto> filteredSuggestions = suggestions.stream()
                .filter(s -> filter == null || s.status() == filter)
                .toList();

        return new SuggestionListResponseDto(
                suggestions.size(),
                (int) read,
                (int) unread,
                filteredSuggestions);
    }

    public Boolean setStatus(SuggestionPatchDto suggestionPatchDto) {
        Suggestion suggestion = suggestionRepository.findById(suggestionPatchDto.id())
                .orElseThrow(() -> new RuntimeException("Sugerencia no encontrada"));
        suggestion.setStatus(suggestionPatchDto.status());
        suggestionRepository.save(suggestion);
        return true;
    }

    @Override
    public SuggestionResponseDto createSuggestion(SuggestionPostDto suggestionPostDto) {
        Suggestion suggestion = new Suggestion(suggestionPostDto.name(), suggestionPostDto.cellphoneNumber(),
                suggestionPostDto.mail(), suggestionPostDto.message(), StatusMessage.No_leido);
        Suggestion res = suggestionRepository.save(suggestion);
        int unread = suggestionRepository.countByStatus(StatusMessage.No_leido);
        notificationService.sendNotificacion(new NotificationDto(
                "Nuevo mensaje",
                suggestion.getName() + " envió un mensaje.",
                unread));
        return new SuggestionResponseDto(res);
    }

}
