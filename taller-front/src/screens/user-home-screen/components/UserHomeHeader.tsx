import React from "react";
import { Wrench } from "lucide-react";
import { UserAccount } from "@/interfaces/UserAccount";
import ClientThemeToggle from "./ClientThemeToggle";

interface UserHomeHeaderProps {
  user: UserAccount;
  darkMode: boolean;
  onToggleTheme: () => void;
}

const UserHomeHeader: React.FC<UserHomeHeaderProps> = ({
  user,
  darkMode,
  onToggleTheme,
}) => {
  return (
    <header>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border p-2">
            <Wrench className="h-4 w-4" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Portal del cliente</p>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Bienvenido, {user.userName}</h1>
          </div>
        </div>
        <ClientThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};

export default UserHomeHeader;
