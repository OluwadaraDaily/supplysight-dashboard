import './App.css'
import KpiCard from './components/kpi-card'
import StockDemandChart from './components/stock-demand-chart'
import { useState } from 'react'

function App() {
  const [selectedRange, setSelectedRange] = useState('7d')

  return (
    <>
      <header className='p-4 shadow-md'>
        <nav className='flex justify-between w-2/3 mx-auto'>
          <p className='text-2xl font-bold'>SupplySight</p>
          <div className='flex items-center gap-1'>
            <button 
              className={`border-none cursor-pointer ${selectedRange === '7d' ? 'font-bold' : ''}`}
              onClick={() => setSelectedRange('7d')}
            >
              7d
            </button>
            <span className='opacity-50'>/</span>
            <button 
              className={`border-none cursor-pointer ${selectedRange === '14d' ? 'font-bold' : ''}`}
              onClick={() => setSelectedRange('14d')}
            >
              14d
            </button>
            <span className='opacity-50'>/</span>
            <button 
              className={`border-none cursor-pointer ${selectedRange === '30d' ? 'font-bold' : ''}`}
              onClick={() => setSelectedRange('30d')}
            >
              30d
            </button>
          </div>
        </nav>
      </header>
      <div className='flex gap-4 h-full'>
        <aside className='max-w-[300px] w-[300px] h-full border border-red-500'></aside>
        <main className='border border-green-900 w-full px-4'>
          <div className='flex items-center gap-4 mb-6'>
            <KpiCard
              title="Total Stock"
              value={20000}
            />
            <KpiCard
              title="Total Demand"
              value={5000}
            />

            <KpiCard
              title="Fill Rate"
              value={1000}
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
