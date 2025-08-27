import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchKPIs } from '../services/kpi';

interface StockDemandChartProps {
  range?: string;
}

const ChartSkeleton = () => {
  return (
    <div className="w-full h-64 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="relative h-48 bg-gray-100 rounded">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
        <div className="absolute bottom-12 left-8 right-8 h-px bg-gray-200"></div>
        <div className="absolute bottom-24 left-8 right-8 h-px bg-gray-200"></div>
        <div className="absolute bottom-36 left-8 right-8 h-px bg-gray-200"></div>
        <div className="absolute left-16 top-4 bottom-4 w-px bg-gray-200"></div>
        <div className="absolute left-32 top-4 bottom-4 w-px bg-gray-200"></div>
        <div className="absolute left-48 top-4 bottom-4 w-px bg-gray-200"></div>
        <div className="absolute left-64 top-4 bottom-4 w-px bg-gray-200"></div>
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <path
            d="M20,120 Q80,100 160,110 Q240,120 360,105"
            stroke="#e5e7eb"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M20,130 Q80,115 160,125 Q240,135 360,120"
            stroke="#f3f4f6"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
};

const StockDemandChart = ({ range = '7d' }: StockDemandChartProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['kpis', range],
    queryFn: () => fetchKPIs(range),
  });

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-500">Error loading data</div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64">No data available</div>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => {
              const d = new Date(date);
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              return `${d.getDate()} ${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
            }}
          />
          <YAxis 
            domain={['dataMin - 50', 'dataMax + 50']} 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            labelFormatter={(date) => {
              const d = new Date(date);
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              return `${d.getDate()} ${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
            }}
            formatter={(value: number, name: string) => [value.toLocaleString(), name === 'stock' ? 'Stock' : 'Demand']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="stock" 
            stroke="#2563eb" 
            strokeWidth={2}
            name="Stock"
          />
          <Line 
            type="monotone" 
            dataKey="demand" 
            stroke="#dc2626" 
            strokeWidth={2}
            name="Demand"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockDemandChart;