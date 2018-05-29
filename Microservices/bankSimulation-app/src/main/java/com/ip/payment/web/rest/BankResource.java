package com.ip.payment.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ip.payment.service.BankService;
import com.ip.payment.service.InsufficientFundsException;
import com.ip.payment.web.rest.errors.BadRequestAlertException;
import com.ip.payment.web.rest.util.HeaderUtil;
import com.ip.payment.service.dto.BankDTO;
import com.ip.payment.service.dto.TransactionDTO;
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
 * REST controller for managing Bank.
 */
@RestController
@RequestMapping("/api")
public class BankResource {

    private final Logger log = LoggerFactory.getLogger(BankResource.class);

    private static final String ENTITY_NAME = "bank";

    private final BankService bankService;

    public BankResource(BankService bankService) {
        this.bankService = bankService;
    }

    /**
     * POST  /banks : Create a new bank.
     *
     * @param bankDTO the bankDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bankDTO, or with status 400 (Bad Request) if the bank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banks")
    @Timed
    public ResponseEntity<BankDTO> createBank(@Valid @RequestBody BankDTO bankDTO) throws URISyntaxException {
        log.debug("REST request to save Bank : {}", bankDTO);
        if (bankDTO.getId() != null) {
            throw new BadRequestAlertException("A new bank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BankDTO result = bankService.save(bankDTO);
        return ResponseEntity.created(new URI("/api/banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /banks : Updates an existing bank.
     *
     * @param bankDTO the bankDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bankDTO,
     * or with status 400 (Bad Request) if the bankDTO is not valid,
     * or with status 500 (Internal Server Error) if the bankDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banks")
    @Timed
    public ResponseEntity<BankDTO> updateBank(@Valid @RequestBody BankDTO bankDTO) throws URISyntaxException {
        log.debug("REST request to update Bank : {}", bankDTO);
        if (bankDTO.getId() == null) {
            return createBank(bankDTO);
        }
        BankDTO result = bankService.save(bankDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bankDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /banks : get all the banks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banks in body
     */
    @GetMapping("/banks")
    @Timed
    public List<BankDTO> getAllBanks() {
        log.debug("REST request to get all Banks");
        return bankService.findAll();
        }

    /**
     * GET  /banks/:id : get the "id" bank.
     *
     * @param id the id of the bankDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bankDTO, or with status 404 (Not Found)
     */
    @GetMapping("/banks/{id}")
    @Timed
    public ResponseEntity<BankDTO> getBank(@PathVariable Long id) {
        log.debug("REST request to get Bank : {}", id);
        BankDTO bankDTO = bankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bankDTO));
    }

    /**
     * DELETE  /banks/:id : delete the "id" bank.
     *
     * @param id the id of the bankDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banks/{id}")
    @Timed
    public ResponseEntity<Void> deleteBank(@PathVariable Long id) {
        log.debug("REST request to delete Bank : {}", id);
        bankService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PutMapping("/transaction")
    @Timed
    public ResponseEntity<BankDTO> updateBankAmount(@Valid @RequestBody TransactionDTO transactionDTO) throws URISyntaxException {
        log.debug("REST request to update Bank : {}",transactionDTO);
        try {
            BankDTO result = bankService.updateBank(transactionDTO);
            if( result != null ) {
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME,result.getId().toString()))
                    .body(result);
            } else {
                return (ResponseEntity<BankDTO>) ResponseEntity.status(HttpStatus.NOT_FOUND); // not working 
            }
        } catch( InsufficientFundsException e ) {
            return (ResponseEntity<BankDTO>) ResponseEntity.status(HttpStatus.NOT_MODIFIED); // not working 
        }
    }

    // @GetMapping("/banks/{number}/{expirationYear}/{expirationMonth}/{name}/{ccv}/{amount}")
    // @Timed
	// public ResponseEntity<BankDTO> getBank(@PathVariable String number,
	// 		@PathVariable Integer expirationYear,
    //         @PathVariable Integer expirationMonth,
    //         @PathVariable String name,
    //         @PathVariable String ccv,
    //         @PathVariable Integer amount) {
    //     try {
    //         BankDTO bank = bankService.updateBank( );
    //         return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bank));
    //     } catch( InsuficientFundsException e) {

    //     }
    //     return null;	

	// }
}
