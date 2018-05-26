package com.ip.payment.service.impl;

import com.ip.payment.service.BankService;
import com.ip.payment.domain.Bank;
import com.ip.payment.repository.BankRepository;
import com.ip.payment.service.dto.BankDTO;
import com.ip.payment.service.mapper.BankMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Bank.
 */
@Service
@Transactional
public class BankServiceImpl implements BankService {

    private final Logger log = LoggerFactory.getLogger(BankServiceImpl.class);

    private final BankRepository bankRepository;

    private final BankMapper bankMapper;

    public BankServiceImpl(BankRepository bankRepository, BankMapper bankMapper) {
        this.bankRepository = bankRepository;
        this.bankMapper = bankMapper;
    }

    /**
     * Save a bank.
     *
     * @param bankDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BankDTO save(BankDTO bankDTO) {
        log.debug("Request to save Bank : {}", bankDTO);
        Bank bank = bankMapper.toEntity(bankDTO);
        bank = bankRepository.save(bank);
        return bankMapper.toDto(bank);
    }

    /**
     * Get all the banks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BankDTO> findAll() {
        log.debug("Request to get all Banks");
        return bankRepository.findAll().stream()
            .map(bankMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one bank by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BankDTO findOne(Long id) {
        log.debug("Request to get Bank : {}", id);
        Bank bank = bankRepository.findOne(id);
        return bankMapper.toDto(bank);
    }

    /**
     * Delete the bank by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bank : {}", id);
        bankRepository.delete(id);
    }

    @Override
    public BankDTO findBank(String number,
    Integer expirationYear,
    Integer expirationMonth,
    String name,
    String ccv) {
        Bank bank = bankRepository.findByNumberAndExpirationYearAndExpirationMonthAndNameAndCcv(number, expirationYear, expirationMonth, name, ccv);
        return bankMapper.toDto(bank);
    }
}
