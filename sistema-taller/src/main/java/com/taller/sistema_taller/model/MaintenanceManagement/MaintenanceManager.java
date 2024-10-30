package com.taller.sistema_taller.model.MaintenanceManagement;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class MaintenanceManager {
    private final List<MaintenanceAdvance> maintenanceProgresses;
    private MaintenanceStatus maintenanceStatus;

    public MaintenanceManager() {
        this.maintenanceProgresses = new ArrayList<>();
        this.maintenanceStatus = MaintenanceStatus.PENDING;
    }

    // Añade un avance de mantenimiento sin imágenes
    public void addMaintenanceAdvance(String description) {
        Long id = generateUniqueId();
        MaintenanceAdvance advance = new MaintenanceAdvance(id, new Date(), description);
        maintenanceProgresses.add(advance);
    }

    // Añade un avance de mantenimiento con imágenes
    public void addMaintenanceAdvance(String description, List<byte[]> images) {
        Long id = generateUniqueId();
        MaintenanceAdvance advance = new MaintenanceAdvance(id, new Date(), description);
        if (images != null) {
            for (byte[] image : images) {
                advance.addImage(image);
            }
        }
        maintenanceProgresses.add(advance);
    }

    // Método para añadir una imagen a un avance específico usando el ID
    public boolean addImageToAdvance(Long advanceId, byte[] image) {
        Optional<MaintenanceAdvance> advanceOpt = maintenanceProgresses.stream()
                .filter(advance -> advance.getIdMaintenanceAdvance().equals(advanceId))
                .findFirst();

        if (advanceOpt.isPresent()) {
            advanceOpt.get().addImage(image);
            return true;
        }
        return false;
    }

    // Método para obtener un avance de mantenimiento por ID
    public MaintenanceAdvance getMaintenanceAdvance(Long advanceId) {
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

    public boolean removeMaintenanceAdvance(Long advanceId) {
        return maintenanceProgresses.removeIf(advance -> advance.getIdMaintenanceAdvance().equals(advanceId));
    }

    private Long generateUniqueId() {
        return (long) (maintenanceProgresses.size() + 1);
    }
}
