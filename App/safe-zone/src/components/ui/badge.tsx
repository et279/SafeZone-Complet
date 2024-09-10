import { FC, ReactNode } from 'react';

interface BadgeProps {
  variant?: 'outline' | 'solid';
  children: ReactNode;
}

const Badge: FC<BadgeProps> = ({ variant = 'solid', children }) => {
  const baseStyles = 'px-2 py-1 rounded-full text-xs font-semibold';
  const variantStyles = {
    solid: 'bg-blue-500 text-white',
    outline: 'border border-blue-500 text-blue-500',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};

export { Badge };
