
import React from 'react';
import { Card } from "@/components/ui/card";

interface FormCardProps {
  children: React.ReactNode;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, className = "" }) => {
  return (
    <Card className={`bg-white dark:bg-gray-900 shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        {children}
      </div>
    </Card>
  );
};

export default FormCard;
