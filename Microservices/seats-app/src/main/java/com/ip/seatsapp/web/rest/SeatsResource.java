package com.ip.seatsapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ip.seatsapp.service.SeatsService;
import com.ip.seatsapp.web.rest.errors.BadRequestAlertException;
import com.ip.seatsapp.web.rest.util.HeaderUtil;
import com.ip.seatsapp.web.rest.util.PaginationUtil;
import com.ip.seatsapp.service.dto.SeatsDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Seats.
 */
@RestController
@RequestMapping("/api")
public class SeatsResource {

    private final Logger log = LoggerFactory.getLogger(SeatsResource.class);

    private static final String ENTITY_NAME = "seats";

    private final SeatsService seatsService;

    public SeatsResource(SeatsService seatsService) {
        this.seatsService = seatsService;
    }

    /**
     * POST  /seats : Create a new seats.
     *
     * @param seatsDTO the seatsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new seatsDTO, or with status 400 (Bad Request) if the seats has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/seats")
    @Timed
    public ResponseEntity<SeatsDTO> createSeats(@Valid @RequestBody SeatsDTO seatsDTO) throws URISyntaxException {
        log.debug("REST request to save Seats : {}", seatsDTO);
        if (seatsDTO.getId() != null) {
            throw new BadRequestAlertException("A new seats cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SeatsDTO result = seatsService.save(seatsDTO);
        return ResponseEntity.created(new URI("/api/seats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /seats : Updates an existing seats.
     *
     * @param seatsDTO the seatsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated seatsDTO,
     * or with status 400 (Bad Request) if the seatsDTO is not valid,
     * or with status 500 (Internal Server Error) if the seatsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/seats")
    @Timed
    public ResponseEntity<SeatsDTO> updateSeats(@Valid @RequestBody SeatsDTO seatsDTO) throws URISyntaxException {
        log.debug("REST request to update Seats : {}", seatsDTO);
        if (seatsDTO.getId() == null) {
            return createSeats(seatsDTO);
        }
        SeatsDTO result = seatsService.save(seatsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, seatsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /seats : get all the seats.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of seats in body
     */
    @GetMapping("/seats")
    @Timed
    public ResponseEntity<List<SeatsDTO>> getAllSeats(Pageable pageable) {
        log.debug("REST request to get a page of Seats");
        Page<SeatsDTO> page = seatsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/seats");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /seats/:id : get the "id" seats.
     *
     * @param id the id of the seatsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the seatsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/seats/{id}")
    @Timed
    public ResponseEntity<SeatsDTO> getSeats(@PathVariable Long id) {
        log.debug("REST request to get Seats : {}", id);
        SeatsDTO seatsDTO = seatsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(seatsDTO));
    }

    @GetMapping("/seats/flights/{type}")
    @Timed
    public ResponseEntity<List<SeatsDTO>> getSeatsByID(Pageable pageable, @PathVariable Integer type ) {
        Page<SeatsDTO> page= seatsService.findByType(pageable, type);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/seats/flights/{type}");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    /**
     * DELETE  /seats/:id : delete the "id" seats.
     *
     * @param id the id of the seatsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/seats/{id}")
    @Timed
    public ResponseEntity<Void> deleteSeats(@PathVariable Long id) {
        log.debug("REST request to delete Seats : {}", id);
        seatsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    
}
