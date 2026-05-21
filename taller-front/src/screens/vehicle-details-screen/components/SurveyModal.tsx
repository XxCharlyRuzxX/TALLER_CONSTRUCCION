import React from "react";
import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";

interface SurveyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number | null, feedback: string) => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ open, onClose, onSubmit }) => {
  const [rating, setRating] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState("");

  const handleSubmit = () => {
    if (!rating) {
      toast.warning("Por favor, selecciona una calificacion.");
      return;
    }
    onSubmit(rating, feedback);
    setRating(null); // Reset
    setFeedback(""); // Reset
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <Card className="relative z-10 w-full max-w-md py-0">
        <CardHeader className="flex flex-row items-start justify-between gap-3 border-b py-5">
          <div>
            <CardTitle>Encuesta de satisfaccion</CardTitle>
            <CardDescription>Califica tu experiencia con el servicio.</CardDescription>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-5 p-5">
          <Field>
            <FieldLabel>Calificacion</FieldLabel>
            <div className="flex gap-2">
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1;
                const selected = (rating ?? 0) >= value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="rounded-md border p-2 transition hover:scale-105"
                    aria-label={`Calificacion ${value}`}
                  >
                    <Star
                      className={`h-5 w-5 ${selected ? "fill-yellow-400 text-yellow-500" : "text-muted-foreground"}`}
                    />
                  </button>
                );
              })}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="survey-feedback">Comentarios adicionales</FieldLabel>
            <textarea
              id="survey-feedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
              placeholder="Comparte como fue tu experiencia"
            />
          </Field>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Enviar encuesta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyModal;
