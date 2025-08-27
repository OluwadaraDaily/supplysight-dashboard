import { BarChart3 } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className='max-w-[300px] w-[300px] h-full bg-white border-r border-gray-200 p-4'>
      <nav className='space-y-2'>
        <div className='flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-black font-medium'>
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;