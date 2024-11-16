package com.taller.sistema_taller.dto;

import java.util.Date;
import java.util.List;

public class MaintenanceAdvanceDTO {
    private Long idMaintenanceAdvance;
    private Date date;
    private String description;
    private List<String> imagesAdvance;

    // Getters y setters
    public Long getIdMaintenanceAdvance() {
        return idMaintenanceAdvance;
    }

    public void setIdMaintenanceAdvance(Long idMaintenanceAdvance) {
        this.idMaintenanceAdvance = idMaintenanceAdvance;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImagesAdvance() {
        return imagesAdvance;
    }

    public void setImagesAdvance(List<String>imagesAdvance) {
        this.imagesAdvance = imagesAdvance;
    }
}
