package io.github.hackathon2018.stock.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.hackathon2018.stock.domain.Respond;
import io.github.hackathon2018.stock.repository.RespondRepository;
import io.github.hackathon2018.stock.web.rest.errors.BadRequestAlertException;
import io.github.hackathon2018.stock.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Respond.
 */
@RestController
@RequestMapping("/api")
public class RespondResource {

    private final Logger log = LoggerFactory.getLogger(RespondResource.class);

    private static final String ENTITY_NAME = "respond";

    private RespondRepository respondRepository;

    public RespondResource(RespondRepository respondRepository) {
        this.respondRepository = respondRepository;
    }

    /**
     * POST  /responds : Create a new respond.
     *
     * @param respond the respond to create
     * @return the ResponseEntity with status 201 (Created) and with body the new respond, or with status 400 (Bad Request) if the respond has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/responds")
    @Timed
    public ResponseEntity<Respond> createRespond(@RequestBody Respond respond) throws URISyntaxException {
        log.debug("REST request to save Respond : {}", respond);
        if (respond.getId() != null) {
            throw new BadRequestAlertException("A new respond cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Respond result = respondRepository.save(respond);
        return ResponseEntity.created(new URI("/api/responds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /responds : Updates an existing respond.
     *
     * @param respond the respond to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated respond,
     * or with status 400 (Bad Request) if the respond is not valid,
     * or with status 500 (Internal Server Error) if the respond couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/responds")
    @Timed
    public ResponseEntity<Respond> updateRespond(@RequestBody Respond respond) throws URISyntaxException {
        log.debug("REST request to update Respond : {}", respond);
        if (respond.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Respond result = respondRepository.save(respond);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, respond.getId().toString()))
            .body(result);
    }

    /**
     * GET  /responds : get all the responds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of responds in body
     */
    @GetMapping("/responds")
    @Timed
    public List<Respond> getAllResponds() {
        log.debug("REST request to get all Responds");
        return respondRepository.findAll();
    }

    /**
     * GET  /responds/:id : get the "id" respond.
     *
     * @param id the id of the respond to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the respond, or with status 404 (Not Found)
     */
    @GetMapping("/responds/{id}")
    @Timed
    public ResponseEntity<Respond> getRespond(@PathVariable Long id) {
        log.debug("REST request to get Respond : {}", id);
        Optional<Respond> respond = respondRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(respond);
    }

    /**
     * DELETE  /responds/:id : delete the "id" respond.
     *
     * @param id the id of the respond to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/responds/{id}")
    @Timed
    public ResponseEntity<Void> deleteRespond(@PathVariable Long id) {
        log.debug("REST request to delete Respond : {}", id);

        respondRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
