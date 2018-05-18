package com.flights.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.flights.domain.Flights;
import com.flights.service.FlightsService;
import com.flights.web.rest.errors.BadRequestAlertException;
import com.flights.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	 * @param flights
	 *            the flights to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new
	 *         flights, or with status 400 (Bad Request) if the flights has already
	 *         an ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@CrossOrigin(origins = "http://localhost:8070")
	@PostMapping("/flights")
	@Timed
	public ResponseEntity<Flights> createFlights(@Valid @RequestBody Flights flights) throws URISyntaxException {
		log.debug("REST request to save Flights : {}", flights);
		if (flights.getId() != null) {
			throw new BadRequestAlertException("A new flights cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Flights result = flightsService.save(flights);
		return ResponseEntity.created(new URI("/api/flights/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /flights : Updates an existing flights.
	 *
	 * @param flights
	 *            the flights to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         flights, or with status 400 (Bad Request) if the flights is not
	 *         valid, or with status 500 (Internal Server Error) if the flights
	 *         couldn't be updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@CrossOrigin(origins = "http://localhost:8070")
	@PutMapping("/flights")
	@Timed
	public ResponseEntity<Flights> updateFlights(@Valid @RequestBody Flights flights) throws URISyntaxException {
		log.debug("REST request to update Flights : {}", flights);
		if (flights.getId() == null) {
			return createFlights(flights);
		}
		Flights result = flightsService.save(flights);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flights.getId().toString()))
				.body(result);
	}

	/**
	 * GET /flights : get all the flights.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of flights in
	 *         body
	 */
	@CrossOrigin(origins = "http://localhost:8070")
	@GetMapping("/flights")
	@Timed
	public List<Flights> getAllFlights() {
		log.debug("REST request to get all Flights");
		return flightsService.findAll();
	}

	/**
	 * GET /flights/:id : get the "id" flights.
	 *
	 * @param id
	 *            the id of the flights to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the flights, or
	 *         with status 404 (Not Found)
	 */
	@CrossOrigin(origins = "http://localhost:8070")
	@GetMapping("/flights/{id}")
	@Timed
	public ResponseEntity<Flights> getFlights(@PathVariable Long id) {
		log.debug("REST request to get Flights : {}", id);
		Flights flights = flightsService.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(flights));
	}

	/**
	 * DELETE /flights/:id : delete the "id" flights.
	 *
	 * @param id
	 *            the id of the flights to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@CrossOrigin(origins = "http://localhost:8070")
	@DeleteMapping("/flights/{id}")
	@Timed
	public ResponseEntity<Void> deleteFlights(@PathVariable Long id) {
		log.debug("REST request to delete Flights : {}", id);
		flightsService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	@CrossOrigin(origins = "http://localhost:8070")
	@GetMapping("/flights/{departure}/{arrival}")
	@Timed
	public ResponseEntity<List<Flights>> findFligths(@PathVariable String departure, @PathVariable String arrival) {
		List<Flights> flights = flightsService.findFlights(departure, arrival);
		if (flights.isEmpty()) {
			return new ResponseEntity<List<Flights>>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<List<Flights>>(flights, HttpStatus.OK);
		}
	}
}
