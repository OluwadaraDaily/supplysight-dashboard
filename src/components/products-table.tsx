import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { fetchWarehouses, fetchProducts } from '../services/kpi';
import { type FiltersState } from './filters-row';

type ProductStatus = 'healthy' | 'low' | 'critical';

interface ProductWithStatus {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
  status: ProductStatus;
}

const getProductStatus = (stock: number, demand: number): ProductStatus => {
  if (stock > demand) return 'healthy';
  if (stock === demand) return 'low';
  return 'critical';
};

const columnHelper = createColumnHelper<ProductWithStatus>();

const StatusPill = ({ status }: { status: ProductWithStatus['status'] }) => {
  const styles = {
    healthy: 'bg-green-100 text-green-800 border-green-200',
    low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    critical: 'bg-red-100 text-red-800 border-red-200',
  };

  const labels = {
    healthy: '🟢 Healthy',
    low: '🟡 Low',
    critical: '🔴 Critical',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const columns = [
  columnHelper.accessor('name', {
    header: 'Product',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('sku', {
    header: 'SKU',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('warehouse', {
    header: 'Warehouse',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('stock', {
    header: 'Stock',
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('demand', {
    header: 'Demand',
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusPill status={info.getValue()} />,
  }),
];

const ProductsTable = () => {
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    warehouse: 'all',
    status: 'all',
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: warehouses, isLoading: warehousesLoading } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses,
  });

  const { data: rawProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const products = useMemo(() => {
    if (!rawProducts) return [];
    return rawProducts.map(product => ({
      ...product,
      status: getProductStatus(product.stock, product.demand),
    }));
  }, [rawProducts]);

  // Update column filters when UI filters change
  useMemo(() => {
    const newColumnFilters: ColumnFiltersState = [];
    
    if (filters.search) {
      newColumnFilters.push({ id: 'global', value: filters.search });
    }
    
    if (filters.warehouse !== 'all') {
      newColumnFilters.push({ id: 'warehouse', value: filters.warehouse });
    }
    
    if (filters.status !== 'all') {
      newColumnFilters.push({ id: 'status', value: filters.status });
    }
    
    setColumnFilters(newColumnFilters);
  }, [filters]);

  const table = useReactTable({
    data: products,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _, value) => {
      const searchValue = value.toLowerCase();
      return (
        row.original.name.toLowerCase().includes(searchValue) ||
        row.original.sku.toLowerCase().includes(searchValue) ||
        row.original.id.toLowerCase().includes(searchValue)
      );
    },
    filterFns: {
      warehouse: (row, _, value) => {
        return row.original.warehouse === value;
      },
      status: (row, _, value) => {
        return row.original.status === value;
      },
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'low', label: 'Low' },
    { value: 'critical', label: 'Critical' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Filters Row */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, SKU, or ID..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <select
            value={filters.warehouse}
            onChange={(e) => setFilters({ ...filters, warehouse: e.target.value })}
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
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productsLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${
                    row.original.status === 'critical' ? 'bg-red-50' : ''
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;