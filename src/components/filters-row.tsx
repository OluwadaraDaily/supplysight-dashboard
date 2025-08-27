import { Search, Filter, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../services/kpi';

export interface FiltersState {
  search: string;
  warehouse: string;
  status: string;
}

interface FiltersRowProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

const FiltersRow = ({ filters, onFiltersChange }: FiltersRowProps) => {
  const { data: warehouses, isLoading: warehousesLoading } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses,
  });

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'low', label: 'Low' },
    { value: 'critical', label: 'Critical' },
  ];

  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, SKU, or ID..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <select
          value={filters.warehouse}
          onChange={(e) => onFiltersChange({ ...filters, warehouse: e.target.value })}
          disabled={warehousesLoading}
          className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
        >
          <option value="all">All Warehouses</option>
          {warehouses?.map((warehouse) => (
            <option key={warehouse.code} value={warehouse.code}>
              {warehouse.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
      </div>

      <div className="relative">
        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
          className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[120px]"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
      </div>

      <div className="flex items-center text-gray-600">
        <Filter size={20} />
      </div>
    </div>
  );
};

export default FiltersRow;