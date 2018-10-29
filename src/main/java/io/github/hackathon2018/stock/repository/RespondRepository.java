package io.github.hackathon2018.stock.repository;

import io.github.hackathon2018.stock.domain.Respond;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Respond entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RespondRepository extends JpaRepository<Respond, Long> {

}
