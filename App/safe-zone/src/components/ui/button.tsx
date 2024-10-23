import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button: FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md transition-colors duration-300';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    ghost: 'bg-transparent text-blue-500 hover:bg-blue-100',
  };
  const sizeStyles = {
    sm: 'text-sm py-1 px-2',
    md: 'text-md py-2 px-4',
    lg: 'text-lg py-3 px-6',
    icon: 'p-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
