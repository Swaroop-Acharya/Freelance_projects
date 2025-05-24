package com.healthify.backend.service;

import com.healthify.backend.model.BillingRecord;
import com.healthify.backend.repository.BillingRecordRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.healthify.backend.dto.BillingRecordRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BillingRecordService {
    private final BillingRecordRepository billingRecordRepository;

    public List<BillingRecord> getAllBillingRecords() {
        return billingRecordRepository.findAll();
    }
    public BillingRecord createBillingRecord(BillingRecordRequest billingRecordRequest) {
        BillingRecord billingRecord = BillingRecord.builder()
            .patientName(billingRecordRequest.patientName())
            .date(billingRecordRequest.date())
            .amount(billingRecordRequest.amount())
            .paymentStatus(billingRecordRequest.paymentStatus())
            .paymentMethod(billingRecordRequest.paymentMethod())
            .description(billingRecordRequest.description())
            .doctor(billingRecordRequest.doctor())
            .build();
        
        return billingRecordRepository.save(billingRecord);
    }
    public BillingRecord updateBillingRecord(Long id, BillingRecordRequest billingRecordRequest) {
        BillingRecord billingRecord = billingRecordRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Billing record not found"));
        billingRecord.setPatientName(billingRecordRequest.patientName());
        return billingRecordRepository.save(billingRecord);
    }
    public void deleteBillingRecord(Long id) {
        billingRecordRepository.deleteById(id);
    }
}
