package santiago.portfolio.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Model.Technology;

public interface TechnologyRepository extends JpaRepository<Technology, Long> {
    
}
