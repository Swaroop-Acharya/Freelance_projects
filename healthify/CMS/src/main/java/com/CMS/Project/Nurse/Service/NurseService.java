package com.CMS.Project.Nurse.Service;

import com.CMS.Project.Admin.Model.User;
import com.CMS.Project.Admin.Repository.UserRepo;
import com.CMS.Project.Doctor.Model.DoctorAvailability;
import com.CMS.Project.Doctor.Repository.DoctorAvailabilityRepo;
import com.CMS.Project.Nurse.DTO.*;
import com.CMS.Project.Nurse.Enum.PatientStatus;
import com.CMS.Project.Nurse.Model.CreateAppointment;
import com.CMS.Project.Nurse.Model.RegisterPatient;
import com.CMS.Project.Nurse.Repo.CreateAppointmentRepo;
import com.CMS.Project.Nurse.Repo.RegisterPatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class NurseService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private RegisterPatientRepo registerPatientRepo;

    @Autowired
    private CreateAppointmentRepo createAppointmentRepo;

    @Autowired
    private DoctorAvailabilityRepo repo;

    public List<RegisterPatient> registerPatient(RegisterPatientDTO dto) {
        RegisterPatient patient = new RegisterPatient();
        patient.setVerificationType(dto.getVerificationType());
        patient.setCountryOfOrigin(dto.getCountryOfOrigin());
        patient.setFirstname(dto.getFirstname());
        patient.setLastname(dto.getLastname());
        patient.setIdentificationNumber(dto.getIdentificationNumber());
        patient.setDOB(dto.getDOB());
        patient.setGender(dto.getGender());
        patient.setSalutation(dto.getSalutation());
        patient.setContactNumber1(dto.getContactNumber1());
        patient.setContactNumber2(dto.getContactNumber2());
        patient.setSource(dto.getSource());
        patient.setDate(dto.getDate());
        patient.setCreatedBy(dto.getCreatedBy());
        patient.setCreatedTime(dto.getCreatedTime());
        String bookingId = generateBookingId();
        patient.setBookingId(bookingId);
        registerPatientRepo.save(patient);
        return registerPatientRepo.findAll();
    }

    public List<RegisterPatient> showRegisteredPatients() {

        return registerPatientRepo.findAll();

    }

    private String generateBookingId() {
        String prefix = "BK";
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        long count = createAppointmentRepo.count() + 1;
        String sequence = String.format("%04d", count);
        return prefix + datePart + sequence;
    }

    public void createAppointment(CreateAppointmentDTO createAppointmentDTO) {
        CreateAppointment createAppointmentDTO1 = new CreateAppointment();
        User user = userRepo.findById(createAppointmentDTO.getDoctorId()).orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + createAppointmentDTO.getDoctorId()));
        RegisterPatient patient = registerPatientRepo.findByContactNumber1(createAppointmentDTO.getPhoneNumber()).orElseGet(() -> registerPatientRepo.findByContactNumber2(createAppointmentDTO.getPhoneNumber()).orElseThrow(() -> new RuntimeException("Patient not found with given phone number")));
        createAppointmentDTO1.setAge(createAppointmentDTO.getAge());
        createAppointmentDTO1.setAppointmentTypes(createAppointmentDTO.getAppointmentType());
        createAppointmentDTO1.setPatientName(createAppointmentDTO.getPatientName());
        createAppointmentDTO1.setPhoneNumber(patient);
        createAppointmentDTO1.setBookingID(createAppointmentDTO.getBookingId());
        createAppointmentDTO1.setStatus(PatientStatus.valueOf(createAppointmentDTO.getAppointmentStatus()));
        createAppointmentDTO1.setAppointmentDateTime(createAppointmentDTO.getAppointmentTime());
        createAppointmentDTO1.setAppointmentTypes(createAppointmentDTO.getAppointmentType());
        createAppointmentDTO1.setDoctor(user);
        createAppointmentDTO1.setDuration(createAppointmentDTO.getDuration());
        createAppointmentDTO1.setPurpose(createAppointmentDTO.getPurpose());
        createAppointmentRepo.save(createAppointmentDTO1);
    }

    public void updateAppointment(Long id, CreateAppointmentDTO appointmentDTO) {
        CreateAppointment existingAppointment = createAppointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + id));

        User doctor = userRepo.findById(appointmentDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + appointmentDTO.getDoctorId()));

        RegisterPatient patient = registerPatientRepo.findByContactNumber1(appointmentDTO.getPhoneNumber())
                .orElseGet(() -> registerPatientRepo.findByContactNumber2(appointmentDTO.getPhoneNumber())
                .orElseThrow(() -> new RuntimeException("Patient not found with given phone number")));

        // Update the fields
        existingAppointment.setAge(appointmentDTO.getAge());
        existingAppointment.setAppointmentTypes(appointmentDTO.getAppointmentType());
        existingAppointment.setPatientName(appointmentDTO.getPatientName());
        existingAppointment.setPhoneNumber(patient);
        existingAppointment.setBookingID(appointmentDTO.getBookingId());
        existingAppointment.setStatus(PatientStatus.valueOf(appointmentDTO.getAppointmentStatus()));
        existingAppointment.setAppointmentDateTime(appointmentDTO.getAppointmentTime());
        existingAppointment.setDoctor(doctor);
        existingAppointment.setDuration(appointmentDTO.getDuration());
        existingAppointment.setPurpose(appointmentDTO.getPurpose());

        createAppointmentRepo.save(existingAppointment);
    }

    public List<AppointmentSchedulesDTO> showSchedules() {
        List<AppointmentSchedulesDTO> list = new ArrayList<>();
        List<CreateAppointment> appointmentList = createAppointmentRepo.findAll();

        for (CreateAppointment a : appointmentList) {
            AppointmentSchedulesDTO dto = new AppointmentSchedulesDTO();

            // Set all fields including ID
            dto.setId(a.getId());
            dto.setPatientName(a.getPatientName());
            dto.setPhoneNumber(String.valueOf(a.getPhoneNumber().getContactNumber1()));
            dto.setAge(String.valueOf(a.getAge()));
            dto.setDate(a.getAppointmentDateTime().toLocalDate());
            dto.setTime(a.getAppointmentDateTime().toLocalTime());
            dto.setPurpose(a.getPurpose());
            dto.setDoctor(userRepo.getDoctorName(a.getDoctor().getId()));
            dto.setStatus(a.getStatus());
            dto.setDuration(a.getDuration());
            dto.setBookingId(a.getBookingID());

            list.add(dto);
        }
        return list;
    }

    public Long getAvailableDoctorCount() {
        return repo.countCurrentlyAvailableDoctors(LocalDate.now(), LocalTime.now());
    }

    public Long countTodayAppointments() {
        return createAppointmentRepo.countTodayAppointments(LocalDate.now());
    }

    public Long countRegisteredPatients() {
        return registerPatientRepo.count();
    }

    public List<CreateAppointment> findUpcomingAppointments(int nextHours) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime later = now.plusHours(nextHours);
        return createAppointmentRepo.findUpcomingAppointments(now, later);
    }

    public DoctorSchedulesDTO searchDoctorSchedulesByID(String id) {

        DoctorAvailability doctorAvailability = repo.findByEmpCode(id);
        DoctorSchedulesDTO doctorSchedulesDTO = new DoctorSchedulesDTO();
        doctorSchedulesDTO.setId(doctorAvailability.getId());
        doctorSchedulesDTO.setName(doctorAvailability.getFullName());
        doctorSchedulesDTO.setStartTime(doctorAvailability.getStartTime());
        doctorSchedulesDTO.setEndTime(doctorAvailability.getEndTime());
        // Convert List<DayOfWeek> → List<String>
        List<String> workingDays = doctorAvailability.getWorkingDays().stream().map(DayOfWeek::name)  // or use getDisplayName() for "Monday", etc.
                .collect(Collectors.toList());
        doctorSchedulesDTO.setWorkingDays(workingDays);

        // Get today's date
        LocalDate today = LocalDate.now();
        DayOfWeek todayDay = today.getDayOfWeek();

        // Sort working days and loop through the next 7 days
        Optional<LocalDate> nextAvailableDate = doctorAvailability.getWorkingDays().stream().sorted().map(dayOfWeek -> {
            int daysToAdd = (dayOfWeek.getValue() - todayDay.getValue() + 7) % 7;
            return today.plusDays(daysToAdd == 0 ? 7 : daysToAdd); // skip today if already passed
        }).min(LocalDate::compareTo); // Get the earliest next date
        LocalTime startTime = doctorAvailability.getStartTime();
        // Combine date + startTime to set next available slot
        if (startTime != null && nextAvailableDate.isPresent()) {
            LocalDateTime nextSlot = LocalDateTime.of(nextAvailableDate.get(), startTime);
            doctorSchedulesDTO.setNxtAvailableSlot(nextSlot);
        }
        //doctorSchedulesDTO.setNxtAvailableSlot(doctorAvailability.getw);
        return doctorSchedulesDTO;
    }

    public DoctorSchedulesDTO searchDoctorScheduleByName(String name) {
        String id = repo.findByFullName(name);
        DoctorAvailability doctorAvailability = repo.findByEmpCode(id);
        DoctorSchedulesDTO doctorSchedulesDTO = new DoctorSchedulesDTO();
        doctorSchedulesDTO.setId(doctorAvailability.getId());
        doctorSchedulesDTO.setName(doctorAvailability.getFullName());
        doctorSchedulesDTO.setStartTime(doctorAvailability.getStartTime());
        doctorSchedulesDTO.setEndTime(doctorAvailability.getEndTime());
        // Convert List<DayOfWeek> → List<String>
        List<String> workingDays = doctorAvailability.getWorkingDays().stream().map(DayOfWeek::name)  // or use getDisplayName() for "Monday", etc.
                .collect(Collectors.toList());
        doctorSchedulesDTO.setWorkingDays(workingDays);

        // Get today's date
        LocalDate today = LocalDate.now();
        DayOfWeek todayDay = today.getDayOfWeek();

        // Sort working days and loop through the next 7 days
        Optional<LocalDate> nextAvailableDate = doctorAvailability.getWorkingDays().stream().sorted().map(dayOfWeek -> {
            int daysToAdd = (dayOfWeek.getValue() - todayDay.getValue() + 7) % 7;
            return today.plusDays(daysToAdd == 0 ? 7 : daysToAdd); // skip today if already passed
        }).min(LocalDate::compareTo); // Get the earliest next date
        LocalTime startTime = doctorAvailability.getStartTime();
        // Combine date + startTime to set next available slot
        if (startTime != null && nextAvailableDate.isPresent()) {
            LocalDateTime nextSlot = LocalDateTime.of(nextAvailableDate.get(), startTime);
            doctorSchedulesDTO.setNxtAvailableSlot(nextSlot);
        }
        //doctorSchedulesDTO.setNxtAvailableSlot(doctorAvailability.getw);
        return doctorSchedulesDTO;
    }

    public List<DoctorSchedulesDTO> searchByCalender(LocalDate date) {

        List<DoctorAvailability> availabilitylist = repo.findByDate(date);
        List<DoctorSchedulesDTO> list = new ArrayList<>();

        for (DoctorAvailability doctorAvailability : availabilitylist) {
            DoctorSchedulesDTO doctorSchedulesDTO = new DoctorSchedulesDTO();

            doctorSchedulesDTO.setId(doctorAvailability.getId());
            doctorSchedulesDTO.setName(doctorAvailability.getFullName());
            doctorSchedulesDTO.setStartTime(doctorAvailability.getStartTime());
            doctorSchedulesDTO.setEndTime(doctorAvailability.getEndTime());
            // Convert List<DayOfWeek> → List<String>
            List<String> workingDays = doctorAvailability.getWorkingDays().stream().map(DayOfWeek::name)  // or use getDisplayName() for "Monday", etc.
                    .collect(Collectors.toList());
            doctorSchedulesDTO.setWorkingDays(workingDays);

            // Get today's date
            LocalDate today = LocalDate.now();
            DayOfWeek todayDay = today.getDayOfWeek();

            // Sort working days and loop through the next 7 days
            Optional<LocalDate> nextAvailableDate = doctorAvailability.getWorkingDays().stream().sorted().map(dayOfWeek -> {
                int daysToAdd = (dayOfWeek.getValue() - todayDay.getValue() + 7) % 7;
                return today.plusDays(daysToAdd == 0 ? 7 : daysToAdd); // skip today if already passed
            }).min(LocalDate::compareTo); // Get the earliest next date
            LocalTime startTime = doctorAvailability.getStartTime();
            // Combine date + startTime to set next available slot
            if (startTime != null && nextAvailableDate.isPresent()) {
                LocalDateTime nextSlot = LocalDateTime.of(nextAvailableDate.get(), startTime);
                doctorSchedulesDTO.setNxtAvailableSlot(nextSlot);
            }

            list.add(doctorSchedulesDTO);
        }
        return list;
    }

    public List<DoctorSchedulesDTO> doctorsAvailableNow() {

        LocalDate date = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        List<DoctorSchedulesDTO> list = new ArrayList<>();
        List<DoctorAvailability> availabilitylist = repo.findDoctorsAvailableNow(date, currentTime);
        for (DoctorAvailability doctorAvailability : availabilitylist) {
            DoctorSchedulesDTO dto = new DoctorSchedulesDTO();
            dto.setId(doctorAvailability.getId());
            dto.setName(doctorAvailability.getFullName());
            dto.setStartTime(doctorAvailability.getStartTime());
            dto.setEndTime(doctorAvailability.getEndTime());
            List<String> workingDays = doctorAvailability.getWorkingDays().stream().map(DayOfWeek::name)  // or use getDisplayName() for "Monday", etc.
                    .collect(Collectors.toList());
            dto.setWorkingDays(workingDays);

            // Get today's date
            LocalDate today = LocalDate.now();
            DayOfWeek todayDay = today.getDayOfWeek();

            // Sort working days and loop through the next 7 days
            Optional<LocalDate> nextAvailableDate = doctorAvailability.getWorkingDays().stream().sorted().map(dayOfWeek -> {
                int daysToAdd = (dayOfWeek.getValue() - todayDay.getValue() + 7) % 7;
                return today.plusDays(daysToAdd == 0 ? 7 : daysToAdd); // skip today if already passed
            }).min(LocalDate::compareTo); // Get the earliest next date
            LocalTime startTime = doctorAvailability.getStartTime();
            // Combine date + startTime to set next available slot
            if (startTime != null && nextAvailableDate.isPresent()) {
                LocalDateTime nextSlot = LocalDateTime.of(nextAvailableDate.get(), startTime);
                dto.setNxtAvailableSlot(nextSlot);
            }
            list.add(dto);
        }
        return list;
    }

    public List<DoctorSchedulesDTO> doctorsUnAvailableNow() {

        LocalDate date = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        List<DoctorSchedulesDTO> list = new ArrayList<>();
        List<DoctorAvailability> availabilitylist = repo.findDoctorsUnAvailableNow(date, currentTime);
        for (DoctorAvailability doctorAvailability : availabilitylist) {
            DoctorSchedulesDTO dto = new DoctorSchedulesDTO();
            dto.setId(doctorAvailability.getId());
            dto.setName(doctorAvailability.getFullName());
            dto.setStartTime(doctorAvailability.getStartTime());
            dto.setEndTime(doctorAvailability.getEndTime());
            List<String> workingDays = doctorAvailability.getWorkingDays().stream().map(DayOfWeek::name)  // or use getDisplayName() for "Monday", etc.
                    .collect(Collectors.toList());
            dto.setWorkingDays(workingDays);

            // Get today's date
            LocalDate today = LocalDate.now();
            DayOfWeek todayDay = today.getDayOfWeek();

            // Sort working days and loop through the next 7 days
            Optional<LocalDate> nextAvailableDate = doctorAvailability.getWorkingDays().stream().sorted().map(dayOfWeek -> {
                int daysToAdd = (dayOfWeek.getValue() - todayDay.getValue() + 7) % 7;
                return today.plusDays(daysToAdd == 0 ? 7 : daysToAdd); // skip today if already passed
            }).min(LocalDate::compareTo); // Get the earliest next date
            LocalTime startTime = doctorAvailability.getStartTime();
            // Combine date + startTime to set next available slot
            if (startTime != null && nextAvailableDate.isPresent()) {
                LocalDateTime nextSlot = LocalDateTime.of(nextAvailableDate.get(), startTime);
                dto.setNxtAvailableSlot(nextSlot);
            }
            list.add(dto);
        }
        return list;
    }

    public MonthlyPatientCountResponseDTO monthlyPatientCount() {

        LocalDate now = LocalDate.now();
        LocalDate firstDayPrevMonth = now.minusMonths(1).withDayOfMonth(1);
        YearMonth prevMonth = YearMonth.from(firstDayPrevMonth);
        LocalDate lastDayPrevMonth = prevMonth.atEndOfMonth();

        WeeklyPatientCountDTO weeklySummary = new WeeklyPatientCountDTO();

        for (int i = 0; i < 4; i++) {
            LocalDate weekStart = firstDayPrevMonth.plusWeeks(i);
            LocalDate weekEnd = weekStart.plusDays(6);
            if (weekEnd.isAfter(lastDayPrevMonth)) {
                weekEnd = lastDayPrevMonth;
            }

            int count;
            if (i == 0) {
                count = registerPatientRepo.findByMonthAndYearFirst(weekStart, weekEnd);
                weeklySummary.setFirstWeekCount(count);
            } else if (i == 1) {
                count = registerPatientRepo.findByMonthAndYearSecond(weekStart, weekEnd);
                weeklySummary.setSecondWeekCount(count);
            } else if (i == 2) {
                count = registerPatientRepo.findByMonthAndYearThird(weekStart, weekEnd);
                weeklySummary.setThirdWeekCount(count);
            } else {
                count = registerPatientRepo.findByMonthAndYearFour(weekStart, weekEnd);
                weeklySummary.setFourthWeekCount(count);
            }
        }

        List<Object[]> results = registerPatientRepo.countPatientsPerDay(firstDayPrevMonth, lastDayPrevMonth);

        // Convert Object[] to DailyPatientCountDTO list
        List<DailyPatientCountDTO> dailyCounts = results.stream()
                .map(row -> new DailyPatientCountDTO((LocalDate) row[0], (Long) row[1]))
                .toList();

        // Fill missing days with zero counts
        Map<LocalDate, Long> dateToCountMap = dailyCounts.stream()
                .collect(Collectors.toMap(DailyPatientCountDTO::getDate, DailyPatientCountDTO::getCount));

        List<DailyPatientCountDTO> fullDailyCounts = new ArrayList<>();
        for (LocalDate date = firstDayPrevMonth; !date.isAfter(lastDayPrevMonth); date = date.plusDays(1)) {
            Long count = dateToCountMap.getOrDefault(date, 0L);
            fullDailyCounts.add(new DailyPatientCountDTO(date, count));
        }

        return new MonthlyPatientCountResponseDTO(weeklySummary, fullDailyCounts);
    }

    public RegisterPatient updatePatient(Long id, RegisterPatientDTO dto) {
        RegisterPatient existingPatient = registerPatientRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + id));

        // Update the fields
        existingPatient.setVerificationType(dto.getVerificationType());
        existingPatient.setCountryOfOrigin(dto.getCountryOfOrigin());
        existingPatient.setFirstname(dto.getFirstname());
        existingPatient.setLastname(dto.getLastname());
        existingPatient.setIdentificationNumber(dto.getIdentificationNumber());
        existingPatient.setDOB(dto.getDOB());
        existingPatient.setGender(dto.getGender());
        existingPatient.setSalutation(dto.getSalutation());
        existingPatient.setContactNumber1(dto.getContactNumber1());
        existingPatient.setContactNumber2(dto.getContactNumber2());
        existingPatient.setSource(dto.getSource());
        existingPatient.setDate(dto.getDate());
        existingPatient.setCreatedBy(dto.getCreatedBy());
        existingPatient.setCreatedTime(dto.getCreatedTime());

        return registerPatientRepo.save(existingPatient);
    }

    public void deleteAppointment(Long id) {
        CreateAppointment appointment = createAppointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + id));
        createAppointmentRepo.delete(appointment);
    }

}