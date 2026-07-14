package santiago.portfolio.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Model.View;

public interface ViewRepository extends JpaRepository<View, Long> {
    
}
