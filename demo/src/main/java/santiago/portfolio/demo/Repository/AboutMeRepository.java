package santiago.portfolio.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Model.AboutMe;

public interface AboutMeRepository extends JpaRepository<AboutMe, Long> {
    
}
