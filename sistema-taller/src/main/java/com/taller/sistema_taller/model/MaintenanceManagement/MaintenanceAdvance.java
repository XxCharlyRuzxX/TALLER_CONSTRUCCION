package com.taller.sistema_taller.model.MaintenanceManagement;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class MaintenanceAdvance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMaintenanceAdvance;
    private Date date;
    private String description;

    @JsonIgnore
    @ElementCollection
    @Lob
    private List<String> imagesAdvance = new ArrayList<>();

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

    public List<String>getImagesAdvance() {
        return imagesAdvance;
    }

    public void addImage(String image) {
        this.imagesAdvance.add(image);
    }
}
