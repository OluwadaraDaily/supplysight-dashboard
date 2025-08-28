# Decisions, Trade-offs, and Improvements

## 🏗️ Architecture Decisions

### **State Management**

- **Tanstack Query over Redux/Context**: Chose React Query for server state management due to built-in caching, background refetching, and optimistic updates. Avoids the boilerplate of Redux while providing superior developer experience.
- **Props vs Context**: Used props for range selection instead of React Context to avoid over-engineering. Context would add unnecessary complexity for simple parent-child communication.
- **Custom Hooks**: Created `useDashboardKPIs` and `useFilteredProducts` to encapsulate business logic and make components more focused and testable.

### **Component Architecture**

- **Modular Structure**: Organized components into `/ui`, `/forms`, and feature components for better maintainability and reusability.
- **Self-contained Forms**: Separated UpdateDemandForm and TransferStockForm into independent components with their own state management for better modularity.
- **Compound Components**: Used drawer with multiple sub-components (DrawerHeader, DrawerTitle, etc.) for flexible composition.

### **Data Layer**

- **Client-side Filtering**: Used Tanstack Table's built-in filtering instead of server-side filtering for better UX and reduced server load. Trade-off: less efficient for large datasets.

## 📊 Technical Trade-offs


### **Development Experience**

- **TypeScript Everywhere**: Strict typing for better development experience and fewer runtime errors. Trade-off: additional development time for type definitions.


## 🚀 What I Would Improve With More Time

### **Advanced Features**

- **Real-time Updates**: WebSocket integration for live inventory changes across multiple users
- **Predictive Analytics**: ML-based demand forecasting and stock optimization recommendations
- **Bulk Operations**: CSV import/export, batch stock transfers, and bulk demand updates
- **Advanced Reporting**: Custom dashboards, scheduled reports, and data export functionality
- **Integration APIs**: Connect with ERP systems, suppliers, and logistics providers

### **Production Readiness**

- **Testing Suite**: Unit tests (Jest), integration tests (Testing Library), E2E tests (Playwright)
- **Monitoring**: Performance metrics, user analytics, and error tracking (Sentry)

### **User Experience**

- **Dark Mode**: Complete theme system with user preference persistence
- **Accessibility**: WCAG 2.1 compliance, keyboard navigation, screen reader optimization
- **Notifications**: Email/SMS alerts for critical stock levels and system events


## 🔧 Technical Debt & Known Issues

- **Animation System**: Current drawer animation works but could be more robust with proper state machine
- **Form Validation**: Basic validation implemented; would benefit from schema validation (Zod/Yup)
- **Mobile Optimization**: Charts need better mobile responsiveness
- **Keyboard Navigation**: Drawer and table need improved keyboard accessibility
