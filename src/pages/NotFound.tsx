
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="text-center max-w-md w-full glass p-8 rounded-xl card-shadow animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="bg-destructive/10 rounded-full p-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-4xl font-medium mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Página não encontrada</p>
        
        <Button asChild className="w-full">
          <a href="/">Voltar para a Página Inicial</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
