import React, { useState } from "react";
import TreatmentsList from "@/components/TreatmentsList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider, useTreatment } from "@/context/TreatmentContext";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FileText, Activity } from "lucide-react";
import OnboardingWizard from "@/components/OnboardingWizard";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { allTreatments } = useTreatment();

  const todayTreatments = allTreatments.filter(treatment => {
    const today = new Date().toDateString();
    return new Date(treatment.createdAt).toDateString() === today;
  });

  const thisWeekTreatments = allTreatments.filter(treatment => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(treatment.createdAt) >= weekAgo;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-900 py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-success">RD Saúde</h1>
            <p className="text-lg text-gray-300">Apoio ao Tratamento</p>
          </div>
          <div className="flex items-center gap-3">
            <PwaInstallPrompt />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {showOnboarding ? (
        <OnboardingWizard onClose={() => setShowOnboarding(false)} />
      ) : (
        <main className="container mx-auto py-8 px-4 space-y-6">
          <div className="text-center mb-8 animate-slide-in">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo ao Sistema de Apoio ao Tratamento</h2>
            <p className="text-gray-400">Gerencie os atendimentos relacionados a medicamentos de forma simples e eficiente</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer" 
                  onClick={() => setShowOnboarding(true)}>
              <CardContent className="p-6 text-center">
                <div className="bg-success w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Novo Apoio</h3>
                <p className="text-gray-400">Registrar um novo atendimento de apoio ao tratamento</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-success w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
                <p className="text-gray-400">Gerar relatórios para impressão</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Resumo
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">{allTreatments.length}</div>
                  <div className="text-gray-400">Total de Apoios</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">{todayTreatments.length}</div>
                  <div className="text-gray-400">Hoje</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">{thisWeekTreatments.length}</div>
                  <div className="text-gray-400">Esta Semana</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <TreatmentsList />
        </main>
      )}

      <footer className="border-t border-gray-700 py-4 text-center mt-8">
        <div className="container mx-auto">
          <p className="text-gray-400">feito por Alexsandro - Itumbiara 3 💚</p>
        </div>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <TreatmentProvider>
      <Dashboard />
    </TreatmentProvider>
  );
};

export default Index;