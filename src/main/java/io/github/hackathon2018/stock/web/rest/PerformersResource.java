package io.github.hackathon2018.stock.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.hackathon2018.stock.domain.Employee;
import io.github.hackathon2018.stock.domain.Performers;
import io.github.hackathon2018.stock.domain.Task;
import io.github.hackathon2018.stock.repository.PerformersRepository;
import io.github.hackathon2018.stock.service.PerformersService;
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
 * REST controller for managing Performers.
 */
@RestController
@RequestMapping("/api")
public class PerformersResource {

    private final Logger log = LoggerFactory.getLogger(PerformersResource.class);

    private static final String ENTITY_NAME = "performers";

    private final PerformersService performersService;
    private final PerformersRepository performersRepository;

    public PerformersResource(PerformersService performersService, PerformersRepository performersRepository) {
        this.performersService = performersService;
        this.performersRepository = performersRepository;
    }

    /**
     * POST  /performers : Create a new performers.
     *
     * @param performers the performers to create
     * @return the ResponseEntity with status 201 (Created) and with body the new performers, or with status 400 (Bad Request) if the performers has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/performers")
    @Timed
    public ResponseEntity<Performers> createPerformers(@RequestBody Performers performers) throws URISyntaxException {
        log.debug("REST request to save Performers : {}", performers);
        if (performers.getId() != null) {
            throw new BadRequestAlertException("A new performers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Performers result = performersRepository.save(performers);
        return ResponseEntity.created(new URI("/api/performers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /performers : Updates an existing performers.
     *
     * @param performers the performers to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated performers,
     * or with status 400 (Bad Request) if the performers is not valid,
     * or with status 500 (Internal Server Error) if the performers couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/performers")
    @Timed
    public ResponseEntity<Performers> updatePerformers(@RequestBody Performers performers) throws URISyntaxException {
        log.debug("REST request to update Performers : {}", performers);
        if (performers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Performers result = performersRepository.save(performers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, performers.getId().toString()))
            .body(result);
    }

    /**
     * GET  /performers : get all the performers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of performers in body
     */
    @GetMapping("/performers")
    @Timed
    public List<Performers> getAllPerformers() {
        log.debug("REST request to get all Performers");
        return performersRepository.findAll();
    }

    /**
     * GET  /performers/:id : get the "id" performers.
     *
     * @param id the id of the performers to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the performers, or with status 404 (Not Found)
     */
    @GetMapping("/performers/{id}")
    @Timed
    public ResponseEntity<Performers> getPerformers(@PathVariable Long id) {
        log.debug("REST request to get Performers : {}", id);
        Optional<Performers> performers = performersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(performers);
    }

    /**
     * DELETE  /performers/:id : delete the "id" performers.
     *
     * @param id the id of the performers to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/performers/{id}")
    @Timed
    public ResponseEntity<Void> deletePerformers(@PathVariable Long id) {
        log.debug("REST request to delete Performers : {}", id);

        performersRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/search")
    @Timed
    public List<Performers> search(@RequestBody Task task){
        log.debug(" search performers by task");
        return performersService.search(task);
    }

    @GetMapping("/search/{keywords}")
    @Timed
    public List<Performers> search(@PathVariable String keywords){
        log.debug(" search performers by keywords");
        return performersService.search(keywords);
    }
}
