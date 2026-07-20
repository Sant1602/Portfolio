package santiago.portfolio.demo.Repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Model.View;

public interface ViewRepository extends JpaRepository<View, Long> {
    boolean existsByIpAndVisitedAtAfter(String ip, LocalDateTime date);
    
}
