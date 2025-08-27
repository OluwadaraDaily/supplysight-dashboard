export interface KPIData {
  date: string;
  stock: number;
  demand: number;
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