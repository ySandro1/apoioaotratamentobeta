
import React from "react";

interface StatusIndicatorProps {
  color: "blue" | "green" | "gray" | "orange";
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  color,
  className = ""
}) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-400",
    orange: "bg-orange-500"
  };

  return (
    <div className={`${colorClasses[color]} w-3 h-3 rounded-full ${className}`} />
  );
};

export default StatusIndicator;
