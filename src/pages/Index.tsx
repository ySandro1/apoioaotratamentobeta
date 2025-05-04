
import React, { useState } from "react";
import TreatmentsList from "@/components/TreatmentsList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider } from "@/context/TreatmentContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import OnboardingWizard from "@/components/OnboardingWizard";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";

const Index: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <TreatmentProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        <header className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Apoio ao Tratamento</h1>
            <div className="flex items-center gap-3">
              <PwaInstallPrompt />
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">
          {showOnboarding ? (
            <OnboardingWizard onClose={() => setShowOnboarding(false)} />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Registro de Apoios</h2>
                <Button 
                  onClick={() => setShowOnboarding(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Novo Apoio
                </Button>
              </div>
              <TreatmentsList />
            </div>
          )}
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 py-4 text-center">
          <div className="container mx-auto">
            <p className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Apoio ao Tratamento</p>
          </div>
        </footer>
      </div>
    </TreatmentProvider>
  );
};

export default Index;
