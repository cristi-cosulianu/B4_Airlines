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

import com.ip.payment.service.CurrencyConverter;
import com.ip.payment.service.InsufficientFundsException;
import com.ip.payment.service.dto.TransactionDTO;

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
        return bankRepository.findAll().stream().map(bankMapper::toDto)
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
    public BankDTO updateBank(TransactionDTO transactionDTO) throws InsufficientFundsException {
        Bank bank = bankRepository.findByNumberAndExpirationYearAndExpirationMonthAndNameAndCcv(
                transactionDTO.getNumber(), transactionDTO.getExpirationYear(), transactionDTO.getExpirationMonth(),
                transactionDTO.getName(), transactionDTO.getCcv());
        CurrencyConverter cc = new CurrencyConverter();
        Float value;
        try {
            value = cc.getUsdRate(bank.getCurrency());
        } catch (NullPointerException e) {
            return null;
        }
        Float result = value * bank.getAmount();
        if (result >= transactionDTO.getAmount()) {
            bank.setAmount(Math.round(
                    1 / value * ((transactionDTO.getIsReversed() == false) ? (result - transactionDTO.getAmount())
                            : (result + transactionDTO.getAmount()))));
            return bankMapper.toDto(bank);
        } else {
            throw new InsufficientFundsException();
        }
    }
}
