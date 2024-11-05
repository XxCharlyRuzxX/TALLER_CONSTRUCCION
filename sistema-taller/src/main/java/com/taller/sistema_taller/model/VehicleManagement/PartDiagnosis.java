package com.taller.sistema_taller.model.VehicleManagement;

import java.util.Date;

public class PartDiagnosis {
    private Long idPart;
    private String partDetail;
    private float partCost;
    private Date estimatedArrivalDate;
    private ShippingStatus shippingStatus;

    public enum ShippingStatus {
        NOT_ORDERED,
        IN_TRANSIT,
        DELIVERED,
        DELAYED
    }

    public PartDiagnosis(Long idPart, String partDetail, float partCost, Date estimatedArrivalDate) {
        this.idPart = idPart;
        this.partDetail = partDetail;
        this.partCost = partCost;
        this.estimatedArrivalDate = estimatedArrivalDate;
        this.shippingStatus = ShippingStatus.NOT_ORDERED;
    }

    public Long getIdPart() {
        return idPart;
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


}
