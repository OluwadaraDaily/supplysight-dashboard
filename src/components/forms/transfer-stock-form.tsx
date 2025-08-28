import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Truck } from 'lucide-react';
import { transferStock, fetchWarehouses, type Product } from '../../services/kpi';

interface TransferStockFormProps {
  product: Product;
  onSuccess?: () => void;
}

const TransferStockForm = ({ product, onSuccess }: TransferStockFormProps) => {
  const [transferQty, setTransferQty] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const queryClient = useQueryClient();

  const { data: warehouses } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses,
  });

  const transferStockMutation = useMutation({
    mutationFn: ({ id, from, to, qty }: { id: string; from: string; to: string; qty: number }) =>
      transferStock(id, from, to, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setTransferQty('');
      setTransferTo('');
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Failed to transfer stock:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const qty = parseInt(transferQty);
    if (isNaN(qty) || qty <= 0 || qty > product.stock) return;
    if (!transferTo) return;
    
    transferStockMutation.mutate({
      id: product.id,
      from: product.warehouse,
      to: transferTo,
      qty,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Truck size={20} />
        Transfer Stock
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transfer To Warehouse
          </label>
          <select
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select warehouse</option>
            {warehouses?.filter(w => w.code !== product.warehouse).map((warehouse) => (
              <option key={warehouse.code} value={warehouse.code}>
                {warehouse.name} ({warehouse.code})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity to Transfer (Max: {product.stock.toLocaleString()})
          </label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={transferQty}
            onChange={(e) => setTransferQty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quantity"
          />
        </div>
        
        {transferStockMutation.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">
              Failed to transfer stock. Please try again.
            </p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={transferStockMutation.isPending || !transferTo || !transferQty}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {transferStockMutation.isPending ? 'Transferring...' : 'Transfer Stock'}
        </button>
      </form>
    </div>
  );
};

export default TransferStockForm;