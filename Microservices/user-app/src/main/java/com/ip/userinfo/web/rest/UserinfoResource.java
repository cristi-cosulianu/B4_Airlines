package com.ip.userinfo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ip.userinfo.service.UserinfoService;
import com.ip.userinfo.web.rest.errors.BadRequestAlertException;
import com.ip.userinfo.web.rest.util.HeaderUtil;
import com.ip.userinfo.web.rest.util.PaginationUtil;
import com.ip.userinfo.service.dto.UserinfoDTO;
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
 * REST controller for managing Userinfo.
 */
@RestController
@RequestMapping("/api")
public class UserinfoResource {

    private final Logger log = LoggerFactory.getLogger(UserinfoResource.class);

    private static final String ENTITY_NAME = "userinfo";

    private final UserinfoService userinfoService;

    public UserinfoResource(UserinfoService userinfoService) {
        this.userinfoService = userinfoService;
    }

    /**
     * POST  /userinfos : Create a new userinfo.
     *
     * @param userinfoDTO the userinfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userinfoDTO, or with status 400 (Bad Request) if the userinfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/userinfos")
    @Timed
    public ResponseEntity<UserinfoDTO> createUserinfo(@Valid @RequestBody UserinfoDTO userinfoDTO) throws URISyntaxException {
        log.debug("REST request to save Userinfo : {}", userinfoDTO);
        if (userinfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new userinfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserinfoDTO result = userinfoService.save(userinfoDTO);
        return ResponseEntity.created(new URI("/api/userinfos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /userinfos : Updates an existing userinfo.
     *
     * @param userinfoDTO the userinfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userinfoDTO,
     * or with status 400 (Bad Request) if the userinfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the userinfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/userinfos")
    @Timed
    public ResponseEntity<UserinfoDTO> updateUserinfo(@Valid @RequestBody UserinfoDTO userinfoDTO) throws URISyntaxException {
        log.debug("REST request to update Userinfo : {}", userinfoDTO);
        if (userinfoDTO.getId() == null) {
            return createUserinfo(userinfoDTO);
        }
        UserinfoDTO result = userinfoService.save(userinfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userinfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /userinfos : get all the userinfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userinfos in body
     */
    @GetMapping("/userinfos")
    @Timed
    public ResponseEntity<List<UserinfoDTO>> getAllUserinfos(Pageable pageable) {
        log.debug("REST request to get a page of Userinfos");
        Page<UserinfoDTO> page = userinfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/userinfos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /userinfos/:id : get the "id" userinfo.
     *
     * @param id the id of the userinfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userinfoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/userinfos/{id}")
    @Timed
    public ResponseEntity<UserinfoDTO> getUserinfo(@PathVariable Long id) {
        log.debug("REST request to get Userinfo : {}", id);
        UserinfoDTO userinfoDTO = userinfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userinfoDTO));
    }

    /**
     * DELETE  /userinfos/:id : delete the "id" userinfo.
     *
     * @param id the id of the userinfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/userinfos/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserinfo(@PathVariable Long id) {
        log.debug("REST request to delete Userinfo : {}", id);
        userinfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
