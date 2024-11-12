package com.taller.sistema_taller.dto;

import java.util.Date;
import com.taller.sistema_taller.model.VehicleManagement.PartDiagnosis.ShippingStatus;
import jakarta.validation.constraints.NotNull;

public class PartDiagnosisDTO {

    private Long idPart;

    @NotNull
    private String partDetail;

    @NotNull
    private float partCost;

    private Date estimatedArrivalDate;

    private ShippingStatus shippingStatus;

    public PartDiagnosisDTO() {
    }

    public PartDiagnosisDTO(Long idPart, String partDetail, float partCost, Date estimatedArrivalDate, ShippingStatus shippingStatus) {
        this.idPart = idPart;
        this.partDetail = partDetail;
        this.partCost = partCost;
        this.estimatedArrivalDate = estimatedArrivalDate;
        this.shippingStatus = shippingStatus;
    }

    public Long getIdPart() {
        return idPart;
    }

    public void setIdPart(Long idPart) {
        this.idPart = idPart;
    }

    public String getPartDetail() {
        return partDetail;
    }

    public void setPartDetail(String partDetail) {
        this.partDetail = partDetail;
    }

    public float getPartCost() {
        return partCost;
    }

    public void setPartCost(float partCost) {
        this.partCost = partCost;
    }

    public Date getEstimatedArrivalDate() {
        return estimatedArrivalDate;
    }

    public void setEstimatedArrivalDate(Date estimatedArrivalDate) {
        this.estimatedArrivalDate = estimatedArrivalDate;
    }

    public ShippingStatus getShippingStatus() {
        return shippingStatus;
    }

    public void setShippingStatus(ShippingStatus shippingStatus) {
        this.shippingStatus = shippingStatus;
    }
}
