
import React from "react";
import ClientForm from "@/components/ClientForm";
import TreatmentsList from "@/components/TreatmentsList";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { TreatmentProvider } from "@/context/TreatmentContext";
import { 
  ChevronRight, 
  Home, 
  FileText, 
  Settings,
  Users,
  LogOut
} from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  return (
    <TreatmentProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-900 shadow-sm px-4 py-3">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-1 rounded">
                  <span className="text-xl font-bold">+</span>
                </div>
                <span className="text-xl font-bold ml-2">Apoio</span>
              </div>
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-blue-50 dark:hover:bg-gray-800"}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Início
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-blue-50 dark:hover:bg-gray-800"}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Pacientes
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-blue-50 dark:hover:bg-gray-800"}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Relatórios
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#" 
                      className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-blue-50 dark:hover:bg-gray-800"}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <Button variant="outline" size="sm" className="rounded-full bg-blue-50 border-none dark:bg-gray-800">
                Logo
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero section */}
          <section className="py-12 container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Apoio ao Tratamento
            </h1>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              Sistema de suporte ao paciente
            </p>
            
            {/* Treatment type tabs - these are just visual in the mockup */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button variant="outline" className="rounded-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700">
                Início
              </Button>
              <Button variant="outline" className="rounded-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700">
                Tratamento
              </Button>
              <Button variant="outline" className="rounded-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700">
                Contínuo
              </Button>
              <Button variant="outline" className="rounded-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700">
                Antibiótico
              </Button>
              <Button variant="outline" className="rounded-full bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700">
                Produto
              </Button>
            </div>
          </section>

          {/* Application container */}
          <div className="container pb-20">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              {/* Main form and listing area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                <ClientForm />
                <TreatmentsList />
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 bg-white dark:bg-gray-900">
          <div className="container text-center">
            <p className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Apoio ao Tratamento</p>
          </div>
        </footer>
      </div>
    </TreatmentProvider>
  );
};

export default Index;
