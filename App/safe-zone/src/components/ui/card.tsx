import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white shadow-sm rounded-md border border-gray-200 p-4">
      {children}
    </div>
  );
};

const CardContent: FC<CardProps> = ({ children }) => {
  return <div>{children}</div>;
};

export { Card, CardContent };
