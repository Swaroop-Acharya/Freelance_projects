package com.healthify.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthify.backend.dto.BillingRecordRequest;
import com.healthify.backend.dto.BillingRecordResponse;
import com.healthify.backend.model.BillingRecord;
import com.healthify.backend.service.BillingRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingRecordController {
    private final BillingRecordService billingRecordService;

    @GetMapping
    public List<BillingRecord> getAllBillingRecords() {
        return billingRecordService.getAllBillingRecords();
    }

    @PostMapping
    public BillingRecord createBillingRecord(@RequestBody BillingRecordRequest billingRecordRequest) {
        return billingRecordService.createBillingRecord(billingRecordRequest);
    }

    @PutMapping("/{id}")
    public BillingRecord updateBillingRecord(@PathVariable Long id, @RequestBody BillingRecordRequest billingRecordRequest) {
        return billingRecordService.updateBillingRecord(id, billingRecordRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteBillingRecord(@PathVariable Long id) {
        billingRecordService.deleteBillingRecord(id);
    }
}
