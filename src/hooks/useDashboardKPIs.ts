import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/kpi';

export interface DashboardKPIs {
  totalStock: number;
  totalDemand: number;
  fillRate: number;
}

export const useDashboardKPIs = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const kpis: DashboardKPIs = {
    totalStock: 0,
    totalDemand: 0,
    fillRate: 0,
  };

  if (products && products.length > 0) {
    kpis.totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    kpis.totalDemand = products.reduce((sum, product) => sum + product.demand, 0);
    
    const totalFulfillable = products.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0);
    kpis.fillRate = kpis.totalDemand > 0 ? (totalFulfillable / kpis.totalDemand) * 100 : 0;
  }

  return {
    kpis,
    isLoading,
    error,
  };
};