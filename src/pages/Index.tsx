
import React from "react";
import ClientForm from "@/components/ClientForm";
import TreatmentsList from "@/components/TreatmentsList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider } from "@/context/TreatmentContext";
import { 
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
              <span className="mr-1">•</span> Plataforma para gestão de tratamentos farmacêuticos
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Acompanhe o progresso dos seus <span className="text-primary">pacientes</span>
            </h1>
            <p className="text-white/70 max-w-xl mx-auto mb-12 text-lg">
              Gerencie tratamentos, monitore o desenvolvimento, e conecte-se com seus pacientes.
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
