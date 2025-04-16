
import React from "react";
import ClientForm from "@/components/ClientForm";
import TreatmentsList from "@/components/TreatmentsList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider } from "@/context/TreatmentContext";

const Index: React.FC = () => {
  return (
    <TreatmentProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        <header className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Apoio ao Tratamento</h1>
            <ThemeSwitcher />
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ClientForm />
            <TreatmentsList />
          </div>
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
