package com.mycompany.taller_v2.MaintenanceManagement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MaintenanceAdvance {
    private final Date date;
    private String description;
    private final List<byte[]> imagesAdvance;

    public MaintenanceAdvance(Date date, String description) {
        this.date = date;
        this.description = description;
        this.imagesAdvance = new ArrayList<>();
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
