package santiago.portfolio.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Enum.StatusMessage;
import santiago.portfolio.demo.Model.Suggestion;

public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

    int countByStatus(StatusMessage status);
    
}
