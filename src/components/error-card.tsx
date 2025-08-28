import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorCardProps {
  title: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorCard = ({ title, message = "Failed to load data", onRetry }: ErrorCardProps) => {
  return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-red-700 mb-2">
        <AlertTriangle size={16} />
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-red-600 text-sm mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-red-700 hover:text-red-800 text-sm font-medium"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorCard;