import React from "react";
import { Download, HelpCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SummarySectionProps {
  totalToPay: number;
  onRequestReport: () => void;
  onSubmitSurvey: () => void;
  onCustomerSupport: () => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  totalToPay,
  onRequestReport,
  onSubmitSurvey,
  onCustomerSupport,
}) => {
  return (
    <Card className="py-0">
      <CardHeader className="border-b py-5">
        <CardTitle>Resumen general</CardTitle>
        <CardDescription>Incluye diagnosticos autorizados y mantenimiento.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        <div>
          <p className="text-muted-foreground text-sm">Total a pagar</p>
          <p className="text-3xl font-semibold tracking-tight">${totalToPay.toFixed(2)} MXN</p>
        </div>

        <div className="space-y-2">
          <Button type="button" className="w-full justify-start" onClick={onRequestReport}>
            <Download className="h-4 w-4" />
            Descargar reporte general
          </Button>

          <Button type="button" variant="outline" className="w-full justify-start" onClick={onSubmitSurvey}>
            <Star className="h-4 w-4" />
            Realizar encuesta de satisfaccion
          </Button>

          <Button type="button" variant="outline" className="w-full justify-start" onClick={onCustomerSupport}>
            <HelpCircle className="h-4 w-4" />
            Ayuda al cliente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummarySection;
