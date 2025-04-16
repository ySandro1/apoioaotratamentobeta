
import React from "react";
import { ChevronRight } from "lucide-react";
import { Input } from "./ui/input";

interface FormInputProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  readOnly = false
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <div className="relative">
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pr-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          readOnly={readOnly}
        />
        <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>
    </div>
  );
};

export default FormInput;
