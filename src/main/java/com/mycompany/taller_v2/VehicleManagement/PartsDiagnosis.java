package com.mycompany.taller_v2.VehicleManagement;

import java.util.Date;

public class PartsDiagnosis {
    private final Long idPartDiagnosis;
    private String partDetail;
    private float partCost;
    private Date estimatedArrivalDate;
    private ShippingStatus shippingStatus;
    private boolean isAuthorized;

    public enum ShippingStatus {
        NOT_ORDERED,
        IN_TRANSIT,
        DELIVERED,
        DELAYED
    }

    public PartsDiagnosis(Long idPartDiagnosis , String partDetail, float partCost, Date estimatedArrivalDate) {
        this.idPartDiagnosis = idPartDiagnosis;
        this.partDetail = partDetail;
        this.partCost = partCost;
        this.estimatedArrivalDate = estimatedArrivalDate;
        this.shippingStatus = ShippingStatus.NOT_ORDERED;
        this.isAuthorized = false;
    }

    public Long getIdPartDiagnosis() {
        return idPartDiagnosis;
    }

    public String getPartDetail() {
        return partDetail;
    }

    public float getPartCost() {
        return partCost;
    }

    public Date getEstimatedArrivalDate() {
        return estimatedArrivalDate;
    }
    
    public boolean isAuthorized() {
        return isAuthorized;
    }

    public void setPartDetail(String partDetail) {
        this.partDetail = partDetail;
    }

    public void setPartCost(float partCost) {
        this.partCost = partCost;
    }

    public void setEstimatedArrivalDate(Date estimatedArrivalDate) {
        this.estimatedArrivalDate = estimatedArrivalDate;
    }

    public void setShippingStatus(ShippingStatus shippingStatus) {
        this.shippingStatus = shippingStatus;
    }

    public ShippingStatus getShippingStatus() {
        return shippingStatus;
    }
    
    public void setAuthorized(boolean isAccepted) {
        this.isAuthorized = isAccepted;
    }
}


