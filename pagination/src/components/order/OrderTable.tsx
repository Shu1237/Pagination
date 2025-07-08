import type { OrderResponse } from "@/utils/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderTableProps {
  orders: OrderResponse[];
  onSort: (sortBy: string) => void;
  currentSortBy?: string;
  currentSortOrder?: 'ASC' | 'DESC';
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: "Chờ xử lý", className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
    confirmed: { label: "Đã xác nhận", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    success: { label: "Thành công", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    completed: { label: "Hoàn thành", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
    failed: { label: "Thất bại", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

const getPaymentMethodBadge = (methodName: string) => {
  const methodConfig = {
    "Visa": { label: "Visa", className: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
    "Paypal": { label: "Paypal", className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" },
    "Cash": { label: "Tiền mặt", className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
    "MoMo": { label: "Momo", className: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
    "ZaloPay": { label: "ZaloPay", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    "VNPay": { label: "VNPay", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  };

  // Fallback for any payment method name
  const config = methodConfig[methodName as keyof typeof methodConfig] || {
    label: methodName || 'N/A',
    className: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

const formatCurrency = (amount: string) => {
  const numericAmount = parseFloat(amount);
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(numericAmount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatShowTime = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  const startFormatted = start.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const endFormatted = end.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `${startFormatted} - ${endFormatted}`;
};

const truncateText = (text: string, maxLength: number = 20) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export default function OrderTable({ orders, onSort, currentSortBy, currentSortOrder }: OrderTableProps) {
  const getSortIcon = (columnKey: string) => {
    if (currentSortBy !== columnKey) {
      return (
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return currentSortOrder === 'ASC' ? (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const handleSort = (sortBy: string) => {
    onSort(sortBy);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSort('order.id')}
            >
              <div className="flex items-center gap-2">
                ID
                {getSortIcon('order.id')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSort('user.username')}
            >
              <div className="flex items-center gap-2">
                Tên người dùng
                {getSortIcon('user.username')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSort('order.total_prices')}
            >
              <div className="flex items-center gap-2">
                Tổng tiền
                {getSortIcon('order.total_prices')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSort('order.order_date')}
            >
              <div className="flex items-center gap-2">
                Ngày đặt
                {getSortIcon('order.order_date')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSort('paymentMethod.name')}
            >
              <div className="flex items-center gap-2">
                Phương thức
                {getSortIcon('paymentMethod.name')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSort('order.status')}
            >
              <div className="flex items-center gap-2">
                Trạng thái
                {getSortIcon('order.status')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSort('movie.name')}
            >
              <div className="flex items-center gap-2">
                Tên phim
                {getSortIcon('movie.name')}
              </div>
            </TableHead>
            <TableHead>Xuất chiếu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <span className="font-mono text-sm text-muted-foreground">
                  #{order.id}
                </span>
              </TableCell>
              <TableCell>
                <div className="font-medium">{order.user?.username || 'N/A'}</div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {formatCurrency(order.total_prices || '0')}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {formatDate(order.order_date)}
                </span>
              </TableCell>
              <TableCell>
                {getPaymentMethodBadge(order.transaction?.PaymentMethod?.method_name || '')}
              </TableCell>
              <TableCell>
                {getStatusBadge(order.status)}
              </TableCell>
              <TableCell>
                <div className="font-medium" title={order.movie?.name || 'N/A'}>
                  {truncateText(order.movie?.name || 'N/A', 15)}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {order.schedule?.start_time && order.schedule?.end_time 
                    ? formatShowTime(order.schedule.start_time, order.schedule.end_time)
                    : 'N/A'
                  }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}