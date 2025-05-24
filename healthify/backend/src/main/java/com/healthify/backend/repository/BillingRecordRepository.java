package com.healthify.backend.repository;


import com.healthify.backend.model.BillingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingRecordRepository extends JpaRepository<BillingRecord, Long> {
}
