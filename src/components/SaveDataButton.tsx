
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SaveDataButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const SaveDataButton: React.FC<SaveDataButtonProps> = ({ 
  onClick, 
  className = "",
  disabled = false 
}) => {
  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <Button 
        className="w-full max-w-md bg-blue-600 hover:bg-blue-700 py-6 h-auto text-lg"
        onClick={onClick}
        disabled={disabled}
      >
        <Save className="mr-2 h-5 w-5" />
        Save Data
      </Button>
    </div>
  );
};

export default SaveDataButton;
