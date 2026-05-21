import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

const ClientThemeToggle: React.FC<ClientThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onToggle}
      aria-label="Cambiar tema"
      title="Cambiar tema"
      className="h-9 w-9"
    >
      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ClientThemeToggle;
