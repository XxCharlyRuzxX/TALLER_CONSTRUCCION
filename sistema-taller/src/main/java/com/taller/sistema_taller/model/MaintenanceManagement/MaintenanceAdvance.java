package com.taller.sistema_taller.model.MaintenanceManagement;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class MaintenanceAdvance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMaintenanceAdvance;
    private Date date;
    private String description;

    @ElementCollection
    @Lob
    private List<byte[]> imagesAdvance = new ArrayList<>();

    public MaintenanceAdvance() {
    }

    public MaintenanceAdvance(Date date, String description) {
        this.date = date;
        this.description = description;
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
