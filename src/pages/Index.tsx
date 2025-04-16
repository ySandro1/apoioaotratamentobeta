
import React from "react";
import ClientForm from "@/components/ClientForm";
import TreatmentsList from "@/components/TreatmentsList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider } from "@/context/TreatmentContext";
import { 
  CalendarDays, 
  ChevronRight, 
  Home, 
  Layers, 
  Users 
} from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Index: React.FC = () => {
  return (
    <TreatmentProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Navbar */}
        <header className="border-b border-white/10 px-4 py-3">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-xl">AT</span>
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-white/10"}
                    >
                      Início
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-white/10"}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-white/10"}
                    >
                      Clientes
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-white/10"}
                    >
                      Tratamentos
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main>
          {/* Hero section */}
          <section className="py-16 container text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary mb-6 text-sm font-medium">
              <span className="mr-1">•</span> Plataforma para gestão de tratamentos médicos
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Acompanhe o progresso dos seus <span className="text-primary">pacientes</span>
            </h1>
            <p className="text-white/70 max-w-xl mx-auto mb-12 text-lg">
              Gerencie tratamentos, monitore o desenvolvimento, e conecte-se com seus clientes.
              Tudo em um só lugar.
            </p>
          </section>

          {/* Layout responsivo: coluna em mobile, linha em desktop */}
          <div className="container pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <ClientForm />
              <TreatmentsList />
            </div>
          </div>

          {/* Feature cards */}
          <section className="container py-20 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all">
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Layers className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalização de Tratamentos</h3>
                <p className="text-white/70">
                  Crie planos de tratamento personalizados e adaptados para cada paciente.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all">
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <CalendarDays className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Acompanhe o Progresso</h3>
                <p className="text-white/70">
                  Visualize métricas e evolução do paciente com informações detalhadas.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all">
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Users className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gerencie Pacientes</h3>
                <p className="text-white/70">
                  Organize sua base de pacientes e mantenha tudo em um só lugar.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 py-8">
          <div className="container text-center">
            <p className="text-white/70">© {new Date().getFullYear()} Apoio ao Tratamento</p>
          </div>
        </footer>
      </div>
    </TreatmentProvider>
  );
};

export default Index;
