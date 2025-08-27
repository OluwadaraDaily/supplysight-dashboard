import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = `
  type Warehouse {
    code: ID!
    name: String!
    city: String!
    country: String!
  }

  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, status: String, warehouse: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
  }
`;

const mockWarehouses = [
  { code: "BLR-A", name: "Bangalore Alpha", city: "Bangalore", country: "India" },
  { code: "PNQ-C", name: "Pune Charlie", city: "Pune", country: "India" },
  { code: "DEL-B", name: "Delhi Beta", city: "Delhi", country: "India" },
  { code: "MUM-D", name: "Mumbai Delta", city: "Mumbai", country: "India" },
];

let mockProducts = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Thread Locker", sku: "TLD-242-10", warehouse: "BLR-A", stock: 150, demand: 90 },
  { id: "P-1006", name: "O-Ring Seal", sku: "ORS-20-100", warehouse: "MUM-D", stock: 45, demand: 45 },
  { id: "P-1007", name: "Steel Rod 6mm", sku: "ROD-06-300", warehouse: "PNQ-C", stock: 200, demand: 180 },
  { id: "P-1008", name: "Ball Bearing", sku: "BBR-12-25", warehouse: "DEL-B", stock: 30, demand: 100 },
];

const generateKPIData = (range: string) => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const totalStock = mockProducts.reduce((sum, p) => sum + p.stock, 0);
    const totalDemand = mockProducts.reduce((sum, p) => sum + p.demand, 0);
    
    const variation = Math.random() * 0.2 - 0.1;
    
    data.push({
      date: date.toISOString().split('T')[0],
      stock: Math.round(totalStock * (1 + variation)),
      demand: Math.round(totalDemand * (1 + variation * 0.5)),
    });
  }
  
  return data;
};

const getProductStatus = (stock: number, demand: number) => {
  if (stock > demand) return 'healthy';
  if (stock === demand) return 'low';
  return 'critical';
};

const resolvers = {
  Query: {
    products: (_: any, { search, status, warehouse }: { search?: string; status?: string; warehouse?: string }) => {
      let filtered = [...mockProducts];
      
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.id.toLowerCase().includes(searchLower)
        );
      }
      
      if (warehouse && warehouse !== 'all') {
        filtered = filtered.filter(p => p.warehouse === warehouse);
      }
      
      if (status && status !== 'all') {
        filtered = filtered.filter(p => getProductStatus(p.stock, p.demand) === status.toLowerCase());
      }
      
      return filtered;
    },
    
    warehouses: () => mockWarehouses,
    
    kpis: (_: any, { range }: { range: string }) => generateKPIData(range),
  },
  
  Mutation: {
    updateDemand: (_: any, { id, demand }: { id: string; demand: number }) => {
      const productIndex = mockProducts.findIndex(p => p.id === id);
      if (productIndex === -1) throw new Error('Product not found');
      
      mockProducts[productIndex].demand = demand;
      return mockProducts[productIndex];
    },
    
    transferStock: (_: any, { id, from, to, qty }: { id: string; from: string; to: string; qty: number }) => {
      const productIndex = mockProducts.findIndex(p => p.id === id);
      if (productIndex === -1) throw new Error('Product not found');
      
      const product = mockProducts[productIndex];
      if (product.warehouse !== from) throw new Error('Product not in source warehouse');
      if (product.stock < qty) throw new Error('Insufficient stock');
      
      product.stock -= qty;
      product.warehouse = to;
      
      return product;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});