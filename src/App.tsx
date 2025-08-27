import './App.css'
import KpiCard from './components/kpi-card'
import StockDemandChart from './components/stock-demand-chart'
import Header from './components/header'
import Sidebar from './components/sidebar'
import ProductsTable from './components/products-table'
import { useDashboardKPIs } from './hooks/useDashboardKPIs'
import { useState } from 'react'

function App() {
  const [selectedRange, setSelectedRange] = useState('7d')
  const { kpis, isLoading: kpisLoading } = useDashboardKPIs()

  return (
    <>
      <Header selectedRange={selectedRange} onRangeChange={setSelectedRange} />
      <div className='flex gap-4 h-full'>
        <Sidebar />
        <main className='w-full px-4 pt-8'>
          <div className='flex items-center gap-4 mb-6'>
            <KpiCard
              title="Total Stock"
              value={kpisLoading ? `0` : kpis.totalStock.toString()}
            />
            <KpiCard
              title="Total Demand"
              value={kpisLoading ? `0` : kpis.totalDemand.toString()}
            />
            <KpiCard
              title="Fill Rate"
              value={kpisLoading ? `0%` : Math.round(kpis.fillRate * 100) / 100 + '%'}
            />
          </div>
          
          <div className='bg-white p-4 rounded-lg shadow-sm mb-6'>
            <h2 className='text-lg font-semibold mb-4'>Stock vs Demand Trend</h2>
            <StockDemandChart range={selectedRange} />
          </div>
          
          <ProductsTable />
        </main>
      </div>
    </>
  )
}

export default App
