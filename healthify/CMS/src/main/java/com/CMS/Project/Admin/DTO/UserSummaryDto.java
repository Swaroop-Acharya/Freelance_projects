package com.CMS.Project.Admin.DTO;

public class UserSummaryDto
{
    private long totalUsers;
    private long totalDoctors;
    private long totalNurses;
    private long totalPharmacy;

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalDoctors() {
        return totalDoctors;
    }

    public void setTotalDoctors(long totalDoctors) {
        this.totalDoctors = totalDoctors;
    }

    public long getTotalNurses() {
        return totalNurses;
    }

    public void setTotalNurses(long totalNurses) {
        this.totalNurses = totalNurses;
    }

    public long getTotalPharmacy() {
        return totalPharmacy;
    }

    public void setTotalPharmacy(long totalPharmacy) {
        this.totalPharmacy = totalPharmacy;
    }
}
