
import React from "react";
import ClientForm from "@/components/ClientForm";
import TreatmentsList from "@/components/TreatmentsList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider } from "@/context/TreatmentContext";

const Index: React.FC = () => {
  return (
    <TreatmentProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container py-10 px-4 sm:px-6 relative">
          <ThemeSwitcher />
          
          <header className="mb-12 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm font-medium animate-fade-in">
              Sistema de Tratamentos
            </div>
            <h1 className="text-4xl font-bold mb-3 animate-fade-in">Controle de Tratamentos</h1>
            <p className="text-muted-foreground max-w-xl mx-auto animate-fade-in text-lg">
              Gerenciamento simplificado para acompanhamento de tratamentos médicos.
            </p>
          </header>

          {/* Layout responsivo: coluna em mobile, linha em desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <ClientForm />
            <TreatmentsList />
          </div>

          <footer className="mt-20 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Sistema de Tratamentos</p>
          </footer>
        </div>
      </div>
    </TreatmentProvider>
  );
};

export default Index;
