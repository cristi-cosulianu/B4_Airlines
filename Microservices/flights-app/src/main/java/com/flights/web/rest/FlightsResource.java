package com.flights.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.flights.service.FlightsService;
import com.flights.web.rest.errors.BadRequestAlertException;
import com.flights.web.rest.util.HeaderUtil;
import com.flights.web.rest.util.PaginationUtil;
import com.flights.service.dto.FlightsDTO;
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
 * REST controller for managing Flights.
 */
@RestController
@RequestMapping("/api")
public class FlightsResource {

	private final Logger log = LoggerFactory.getLogger(FlightsResource.class);

	private static final String ENTITY_NAME = "flights";

	private final FlightsService flightsService;

	public FlightsResource(FlightsService flightsService) {
		this.flightsService = flightsService;
	}

	/**
	 * POST /flights : Create a new flights.
	 *
	 * @param flightsDTO
	 *            the flightsDTO to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new
	 *         flightsDTO, or with status 400 (Bad Request) if the flights has
	 *         already an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/flights")
	@Timed
	public ResponseEntity<FlightsDTO> createFlights(@Valid @RequestBody FlightsDTO flightsDTO)
			throws URISyntaxException {
		log.debug("REST request to save Flights : {}", flightsDTO);
		if (flightsDTO.getId() != null) {
			throw new BadRequestAlertException("A new flights cannot already have an ID", ENTITY_NAME, "idexists");
		}
		FlightsDTO result = flightsService.save(flightsDTO);
		return ResponseEntity.created(new URI("/api/flights/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /flights : Updates an existing flights.
	 *
	 * @param flightsDTO
	 *            the flightsDTO to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         flightsDTO, or with status 400 (Bad Request) if the flightsDTO is not
	 *         valid, or with status 500 (Internal Server Error) if the flightsDTO
	 *         couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/flights")
	@Timed
	public ResponseEntity<FlightsDTO> updateFlights(@Valid @RequestBody FlightsDTO flightsDTO)
			throws URISyntaxException {
		log.debug("REST request to update Flights : {}", flightsDTO);
		if (flightsDTO.getId() == null) {
			return createFlights(flightsDTO);
		}
		FlightsDTO result = flightsService.save(flightsDTO);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightsDTO.getId().toString())).body(result);
	}

	/**
	 * GET /flights : get all the flights.
	 *
	 * @param pageable
	 *            the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of flights in
	 *         body
	 */
	@GetMapping("/flights")
	@Timed
	public ResponseEntity<List<FlightsDTO>> getAllFlights(Pageable pageable) {
		log.debug("REST request to get a page of Flights");
		Page<FlightsDTO> page = flightsService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/flights");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}

	/**
	 * GET /flights/:id : get the "id" flights.
	 *
	 * @param id
	 *            the id of the flightsDTO to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the flightsDTO,
	 *         or with status 404 (Not Found)
	 */
	@GetMapping("/flights/{id}")
	@Timed
	public ResponseEntity<FlightsDTO> getFlights(@PathVariable Long id) {
		log.debug("REST request to get Flights : {}", id);
		FlightsDTO flightsDTO = flightsService.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(flightsDTO));
	}

	/**
	 * DELETE /flights/:id : delete the "id" flights.
	 *
	 * @param id
	 *            the id of the flightsDTO to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/flights/{id}")
	@Timed
	public ResponseEntity<Void> deleteFlights(@PathVariable Long id) {
		log.debug("REST request to delete Flights : {}", id);
		flightsService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	@GetMapping("/flights/{departure}/{arrival}")
	@Timed
	public ResponseEntity<List<FlightsDTO>> findFlights(Pageable pageable, @PathVariable String departure,
			@PathVariable String arrival) {
		Page<FlightsDTO> page = flightsService.findFlights(pageable, departure, arrival);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/flights/{departure}/{arrival}");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);

	}
}
