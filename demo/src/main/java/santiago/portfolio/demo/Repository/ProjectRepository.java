package santiago.portfolio.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import santiago.portfolio.demo.Model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}
