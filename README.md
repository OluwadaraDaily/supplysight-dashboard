# SupplySight Dashboard

A comprehensive supply chain management dashboard built with React, TypeScript, and modern web technologies. Monitor inventory levels, track demand, and manage stock transfers across multiple warehouses in real-time.

## 🚀 Features

### 📊 Dashboard Overview
- **Real-time KPI Cards**: Total Stock, Total Demand, and Fill Rate calculations
- **Interactive Charts**: Stock vs Demand trend visualization with date range selection
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📦 Product Management
- **Advanced Filtering**: Search by name, SKU, or ID with warehouse and status filters
- **Interactive Table**: Click any product row to view detailed information
- **Status Indicators**: Visual health status (🟢 Healthy, 🟡 Low, 🔴 Critical)
- **Pagination**: Efficient browsing with 10 items per page

### 🔄 Inventory Operations
- **Update Demand**: Modify product demand requirements
- **Transfer Stock**: Move inventory between warehouses
- **Real-time Updates**: Automatic data refresh after operations
- **Form Validation**: Comprehensive input validation and error handling

### 🎨 Modern UI/UX
- **Responsive Drawer**: Mobile-friendly side panel for product details
- **Loading States**: Skeleton loading and smooth transitions
- **Status Pills**: Color-coded status indicators with tinted rows for critical items
- **Clean Design**: Modern interface with Tailwind CSS styling

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Data & State Management
- **TanStack Query** - Server state management with caching
- **TanStack Table** - Powerful table with filtering and pagination
- **GraphQL** - Efficient data fetching with Apollo Server

### Visualization
- **Recharts** - Beautiful, responsive charts
- **Lucide React** - Modern icon library

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supplysight-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (drawer, etc.)
│   ├── forms/          # Form components
│   └── ...             # Feature components
├── hooks/              # Custom React hooks
├── services/           # API services and data fetching
├── lib/                # Utility functions
└── graphql/            # GraphQL schema and resolvers
```

## 🔧 Key Components

### Data Flow
- **GraphQL API**: Centralized data management with mock data
- **React Query**: Caching, background updates, and optimistic updates
- **Form Management**: Self-contained form components with validation

### Features Implementation
- **Filtering**: TanStack Table's built-in filtering system
- **Mutations**: GraphQL mutations with automatic cache invalidation
- **Real-time UI**: Optimistic updates and loading states

## 🎯 Business Logic

### Fill Rate Calculation
```
Fill Rate = (sum(min(stock, demand)) / sum(demand)) * 100%
```

### Status Rules
- **🟢 Healthy**: Stock > Demand
- **🟡 Low**: Stock = Demand  
- **🔴 Critical**: Stock < Demand (with visual row highlighting)

## 🚀 Future Enhancements

- [ ] User authentication and role-based access
- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] Advanced analytics and reporting
- [ ] Email notifications for critical stock levels
- [ ] Bulk operations and CSV import/export
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using modern web technologies for efficient supply chain management.