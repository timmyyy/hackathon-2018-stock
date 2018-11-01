package io.github.hackathon2018.stock.repository;

import io.github.hackathon2018.stock.domain.Performers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Performers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerformersRepository extends JpaRepository<Performers, Long> {

}
