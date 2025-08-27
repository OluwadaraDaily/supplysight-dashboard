import React from 'react';

interface IKpiCardProps {
  title: string;
  value: string;
}

const KpiCard: React.FC<IKpiCardProps> = ({ title, value }) => {
  return (
    <div className="p-5 rounded-xl bg-gray-900 text-white w-[25%] mb-3 md:mb-0">
        <p className="text-sm mb-3">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
  );
};

export default KpiCard;