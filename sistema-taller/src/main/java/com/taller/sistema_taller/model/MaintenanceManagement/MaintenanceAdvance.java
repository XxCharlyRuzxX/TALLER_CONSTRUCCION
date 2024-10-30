package com.taller.sistema_taller.model.MaintenanceManagement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MaintenanceAdvance {
    private final Long idMaintenanceAdvance;
    private final Date date;
    private String description;
    private final List<byte[]> imagesAdvance;

    public MaintenanceAdvance(Long idMaintenanceAdvance, Date date, String description) {
        this.idMaintenanceAdvance = idMaintenanceAdvance;
        this.date = date;
        this.description = description;
        this.imagesAdvance = new ArrayList<>();
    }

    public Long getIdMaintenanceAdvance() {
        return idMaintenanceAdvance;
    }

    public Date getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<byte[]> getImagesAdvance() {
        return imagesAdvance;
    }

    public void addImage(byte[] image) {
        this.imagesAdvance.add(image);
    }
}
