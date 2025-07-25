import React, { useState } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider, useTreatment } from "@/context/TreatmentContext";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FileText, Activity } from "lucide-react";
import OnboardingWizard from "@/components/OnboardingWizard";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import SplashScreen from "@/components/SplashScreen";
import ReportsSection from "@/components/ReportsSection";

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card shadow-sm py-4 px-6 border-b border-border">
        <div className="container mx-auto flex items-center justify-between">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-success">RD Saúde</h1>
            <p className="text-lg text-muted-foreground">Apoio ao Tratamento</p>
          </div>
          <div className="flex items-center gap-3">
            <PwaInstallPrompt />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {showOnboarding ? (
        <OnboardingWizard onClose={() => setShowOnboarding(false)} />
      ) : showReports ? (
        <main className="container mx-auto py-8 px-4">
          <ReportsSection />
          <div className="mt-6 text-center">
            <button 
              onClick={() => setShowReports(false)}
              className="text-primary hover:underline"
            >
              ← Voltar para o início
            </button>
          </div>
        </main>
      ) : (
        <main className="container mx-auto py-8 px-4 space-y-6">
          <div className="text-center mb-8 animate-slide-in">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo ao Sistema de Apoio ao Tratamento</h2>
            <p className="text-muted-foreground">Gerencie os atendimentos relacionados a medicamentos de forma simples e eficiente</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border-border hover:bg-accent/10 transition-colors cursor-pointer" 
                  onClick={() => setShowOnboarding(true)}>
              <CardContent className="p-6 text-center">
                <div className="bg-success w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-success-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Novo Apoio</h3>
                <p className="text-muted-foreground">Registrar um novo atendimento de apoio ao tratamento</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => setShowReports(true)}>
              <CardContent className="p-6 text-center">
                <div className="bg-success w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-success-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
                <p className="text-muted-foreground">Gerar relatórios para impressão</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Resumo
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">{allTreatments.length}</div>
                  <div className="text-muted-foreground">Total de Apoios</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">{todayTreatments.length}</div>
                  <div className="text-muted-foreground">Hoje</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">{thisWeekTreatments.length}</div>
                  <div className="text-muted-foreground">Esta Semana</div>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </main>
      )}

      <footer className="border-t border-border py-4 text-center mt-8">
        <div className="container mx-auto">
          <p className="text-muted-foreground">feito por Alexsandro - Itumbiara 3 💚</p>
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