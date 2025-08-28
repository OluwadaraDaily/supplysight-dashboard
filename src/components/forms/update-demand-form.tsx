import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookUp2 } from 'lucide-react';
import { updateDemand, type Product } from '../../services/kpi';

interface UpdateDemandFormProps {
  product: Product;
  onSuccess?: () => void;
}

const UpdateDemandForm = ({ product, onSuccess }: UpdateDemandFormProps) => {
  const [demandValue, setDemandValue] = useState(product.demand.toString());
  const queryClient = useQueryClient();

  const updateDemandMutation = useMutation({
    mutationFn: ({ id, demand }: { id: string; demand: number }) => 
      updateDemand(id, demand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDemandValue('');
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDemand = parseInt(demandValue);
    if (isNaN(newDemand) || newDemand < 0) return;
    
    updateDemandMutation.mutate({ id: product.id, demand: newDemand });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <BookUp2 size={20} />
        Update Demand
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Demand (Current: {product.demand.toLocaleString()})
          </label>
          <input
            type="number"
            min="0"
            value={demandValue}
            onChange={(e) => setDemandValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new demand"
          />
        </div>
        
        <button
          type="submit"
          disabled={updateDemandMutation.isPending || !demandValue}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateDemandMutation.isPending ? 'Updating...' : 'Update Demand'}
        </button>
      </form>
    </div>
  );
};

export default UpdateDemandForm;