import './App.css'
import KpiCard from './components/kpi-card'
import KpiCardSkeleton from './components/kpi-card-skeleton'
import ErrorCard from './components/error-card'
import StockDemandChart from './components/stock-demand-chart'
import Header from './components/header'
import Sidebar from './components/sidebar'
import ProductsTable from './components/products-table'
import ErrorBoundary from './components/error-boundary'
import { useDashboardKPIs } from './hooks/useDashboardKPIs'
import { useState } from 'react'

function App() {
  const [selectedRange, setSelectedRange] = useState('7d')
  const { kpis, isLoading: kpisLoading, error: kpisError } = useDashboardKPIs()

  return (
    <>
      <Header selectedRange={selectedRange} onRangeChange={setSelectedRange} />
      <div className='flex gap-4 h-full'>
        <Sidebar />
        <main className='w-full px-4 pt-8'>
          <div className='flex items-center gap-4 mb-6'>
            {kpisLoading ? (
              <>
                <KpiCardSkeleton />
                <KpiCardSkeleton />
                <KpiCardSkeleton />
              </>
            ) : kpisError ? (
              <>
                <ErrorCard title="Total Stock" message="Failed to load KPI data" />
                <ErrorCard title="Total Demand" message="Failed to load KPI data" />
                <ErrorCard title="Fill Rate" message="Failed to load KPI data" />
              </>
            ) : (
              <>
                <KpiCard
                  title="Total Stock"
                  value={kpis.totalStock.toLocaleString()}
                />
                <KpiCard
                  title="Total Demand"
                  value={kpis.totalDemand.toLocaleString()}
                />
                <KpiCard
                  title="Fill Rate"
                  value={Math.round(kpis.fillRate * 100) / 100 + '%'}
                />
              </>
            )}
          </div>
          
          <ErrorBoundary>
            <div className='bg-white p-4 rounded-lg shadow-sm mb-6'>
              <h2 className='text-lg font-semibold mb-4'>Stock vs Demand Trend</h2>
              <StockDemandChart range={selectedRange} />
            </div>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ProductsTable />
          </ErrorBoundary>
        </main>
      </div>
    </>
  )
}

export default App
