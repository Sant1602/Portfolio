package santiago.portfolio.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Model.Experience;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    
}
