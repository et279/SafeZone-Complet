import { InputHTMLAttributes, FC } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="border border-gray-300 rounded-md px-4 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      {...props}
    />
  );
};

export { Input };
