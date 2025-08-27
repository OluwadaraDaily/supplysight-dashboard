interface HeaderProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

const Header = ({ selectedRange, onRangeChange }: HeaderProps) => {
  return (
    <header className='p-4 shadow-md'>
      <nav className='flex justify-between w-2/3 mx-auto'>
        <p className='text-2xl font-bold'>SupplySight</p>
        <div className='flex items-center gap-1'>
          <button 
            className={`border-none cursor-pointer ${selectedRange === '7d' ? 'font-bold' : ''}`}
            onClick={() => onRangeChange('7d')}
          >
            7d
          </button>
          <span className='opacity-50'>/</span>
          <button 
            className={`border-none cursor-pointer ${selectedRange === '14d' ? 'font-bold' : ''}`}
            onClick={() => onRangeChange('14d')}
          >
            14d
          </button>
          <span className='opacity-50'>/</span>
          <button 
            className={`border-none cursor-pointer ${selectedRange === '30d' ? 'font-bold' : ''}`}
            onClick={() => onRangeChange('30d')}
          >
            30d
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;