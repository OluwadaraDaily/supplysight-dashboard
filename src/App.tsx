import './App.css'
import KpiCard from './components/kpi-card'
import StockDemandChart from './components/stock-demand-chart'
import Header from './components/header'
import { useDashboardKPIs } from './hooks/useDashboardKPIs'
import { useState } from 'react'

function App() {
  const [selectedRange, setSelectedRange] = useState('7d')
  const { kpis, isLoading: kpisLoading } = useDashboardKPIs()

  return (
    <>
      <Header selectedRange={selectedRange} onRangeChange={setSelectedRange} />
      <div className='flex gap-4 h-full pt-8'>
        <aside className='max-w-[300px] w-[300px] h-full border border-red-500'></aside>
        <main className='w-full px-4'>
          <div className='flex items-center gap-4 mb-6'>
            <KpiCard
              title="Total Stock"
              value={kpisLoading ? 0 : kpis.totalStock}
            />
            <KpiCard
              title="Total Demand"
              value={kpisLoading ? 0 : kpis.totalDemand}
            />
            <KpiCard
              title="Fill Rate"
              value={kpisLoading ? 0 : Math.round(kpis.fillRate * 100) / 100}
            />
          </div>
          
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <h2 className='text-lg font-semibold mb-4'>Stock vs Demand Trend</h2>
            <StockDemandChart range={selectedRange} />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
