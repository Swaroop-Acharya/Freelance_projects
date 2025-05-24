package com.healthify.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.healthify.backend.model.PaymentMethod;
import com.healthify.backend.model.PaymentStatus;

public record BillingRecordResponse(
    Long billId,
    String patientName,
    LocalDate date,
    BigDecimal amount,
    PaymentStatus paymentStatus,
    PaymentMethod paymentMethod,
    String description,
    String doctor
) {}