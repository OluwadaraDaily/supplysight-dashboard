import { Package, MapPin } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from './ui/drawer';
import { type Product } from '../services/kpi';
import UpdateDemandForm from './forms/update-demand-form';
import TransferStockForm from './forms/transfer-stock-form';

interface ProductWithStatus extends Product {
  status: 'healthy' | 'low' | 'critical';
}

interface ProductDrawerProps {
  product: ProductWithStatus | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDrawer = ({ product, isOpen, onClose }: ProductDrawerProps) => {

  if (!product) return null;

  const statusColors = {
    healthy: 'text-green-600 bg-green-100',
    low: 'text-yellow-600 bg-yellow-100',
    critical: 'text-red-600 bg-red-100',
  };

  const statusLabels = {
    healthy: '🟢 Healthy',
    low: '🟡 Low',
    critical: '🔴 Critical',
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-start justify-between w-full">
            <div>
              <DrawerTitle>{product.name}</DrawerTitle>
              <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                <span>SKU: {product.sku}</span>
                <span>ID: {product.id}</span>
              </div>
            </div>
            <DrawerClose onClick={onClose}>{null}</DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Package size={20} />
              Product Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Current Stock</div>
                <div className="text-2xl font-bold">{product.stock.toLocaleString()}</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Current Demand</div>
                <div className="text-2xl font-bold">{product.demand.toLocaleString()}</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <MapPin size={16} />
                  Warehouse
                </div>
                <div className="font-medium">{product.warehouse}</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                  {statusLabels[product.status]}
                </span>
              </div>
            </div>
          </div>

          <UpdateDemandForm product={product} onSuccess={onClose} />

          <TransferStockForm product={product} onSuccess={onClose} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDrawer;