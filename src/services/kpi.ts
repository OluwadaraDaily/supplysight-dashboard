export interface KPIData {
  date: string;
  stock: number;
  demand: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
}

export interface Warehouse {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const fetchKPIs = async (range: string): Promise<KPIData[]> => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetKPIs($range: String!) {
          kpis(range: $range) {
            date
            stock
            demand
          }
        }
      `,
      variables: { range },
    }),
  });

  const result = await response.json();
  
  if (result.data?.kpis) {
    return result.data.kpis;
  }
  
  throw new Error('Failed to fetch KPI data');
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetProducts {
          products {
            id
            name
            sku
            warehouse
            stock
            demand
          }
        }
      `,
    }),
  });

  const result = await response.json();
  
  if (result.data?.products) {
    return result.data.products;
  }
  
  throw new Error('Failed to fetch products data');
};

export const fetchWarehouses = async (): Promise<Warehouse[]> => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetWarehouses {
          warehouses {
            code
            name
            city
            country
          }
        }
      `,
    }),
  });

  const result = await response.json();
  
  if (result.data?.warehouses) {
    return result.data.warehouses;
  }
  
  throw new Error('Failed to fetch warehouses data');
};

export const updateDemand = async (id: string, demand: number): Promise<Product> => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation UpdateDemand($id: ID!, $demand: Int!) {
          updateDemand(id: $id, demand: $demand) {
            id
            name
            sku
            warehouse
            stock
            demand
          }
        }
      `,
      variables: { id, demand },
    }),
  });

  const result = await response.json();
  
  if (result.data?.updateDemand) {
    return result.data.updateDemand;
  }
  
  throw new Error('Failed to update demand');
};

export const transferStock = async (id: string, from: string, to: string, qty: number): Promise<Product> => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation TransferStock($id: ID!, $from: String!, $to: String!, $qty: Int!) {
          transferStock(id: $id, from: $from, to: $to, qty: $qty) {
            id
            name
            sku
            warehouse
            stock
            demand
          }
        }
      `,
      variables: { id, from, to, qty },
    }),
  });

  const result = await response.json();
  
  if (result.data?.transferStock) {
    return result.data.transferStock;
  }
  
  throw new Error('Failed to transfer stock');
};