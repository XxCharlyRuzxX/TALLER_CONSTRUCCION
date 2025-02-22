package com.taller.sistema_taller.model.MaintenanceManagement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import jakarta.persistence.*;

@Entity
public class MaintenanceManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMaintenanceManager;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MaintenanceAdvance> maintenanceProgresses = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private MaintenanceStatus maintenanceStatus = MaintenanceStatus.PENDING;

    public MaintenanceManager() {
    }

    public Long getIdMaintenanceManager() {
        return idMaintenanceManager;
    }

    public void addMaintenanceAdvanceWithoutImage(String description) {
        MaintenanceAdvance advance = new MaintenanceAdvance(new Date(), description);
        maintenanceProgresses.add(advance);
    }

    public void addMaintenanceAdvanceWithImages(String description, List<String> images) {
        MaintenanceAdvance advance = new MaintenanceAdvance(new Date(), description);
        if (images != null) {
            for (String image : images) {
                advance.addImage(image);
            }
        }
        maintenanceProgresses.add(advance);
    }

    public boolean addImageToAdvanceById(Long advanceId, String image) {
        Optional<MaintenanceAdvance> advanceOpt = maintenanceProgresses.stream()
                .filter(advance -> advance.getIdMaintenanceAdvance().equals(advanceId))
                .findFirst();

        if (advanceOpt.isPresent()) {
            advanceOpt.get().addImage(image);
            return true;
        }
        return false;
    }

    public MaintenanceAdvance getMaintenanceAdvanceById(Long advanceId) {
        return maintenanceProgresses.stream()
                .filter(advance -> advance.getIdMaintenanceAdvance().equals(advanceId))
                .findFirst()
                .orElse(null);
    }

    public List<MaintenanceAdvance> getMaintenanceProgresses() {
        return maintenanceProgresses;
    }

    public void setMaintenanceStatus(MaintenanceStatus newStatus) {
        this.maintenanceStatus = newStatus;
    }

    public MaintenanceStatus getMaintenanceStatus() {
        return maintenanceStatus;
    }

    public boolean removeMaintenanceAdvancebyId(Long advanceId) {
        return maintenanceProgresses.removeIf(advance -> advance.getIdMaintenanceAdvance().equals(advanceId));
    }

}
