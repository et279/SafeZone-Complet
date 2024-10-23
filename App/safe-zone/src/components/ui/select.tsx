import { useState, FC, ReactNode } from 'react';

interface SelectProps {
  children: ReactNode;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

const Select: FC<SelectProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {children}
    </div>
  );
};

const SelectTrigger: FC<SelectProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md p-2 cursor-pointer">
      {children}
    </div>
  );
};

const SelectValue: FC<{ placeholder: string }> = ({ placeholder }) => {
  return <span className="text-gray-500">{placeholder}</span>;
};

const SelectContent: FC<SelectProps> = ({ children }) => {
  return (
    <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md border border-gray-300 z-10">
      {children}
    </div>
  );
};

const SelectItem: FC<SelectItemProps> = ({ value, children }) => {
  return (
    <div
      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
      data-value={value}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
