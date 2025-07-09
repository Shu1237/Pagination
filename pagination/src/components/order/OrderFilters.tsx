import type { OrderQueryType } from "@/utils/type";
import { useDebouncedParams } from "@/hook/useDebounce";

interface OrderFiltersProps {
  queryParams: OrderQueryType;
  onParamsChange: (params: Partial<OrderQueryType>) => void;
}

export default function OrderFilters({ queryParams, onParamsChange }: OrderFiltersProps) {
  const { localParams, updateLocalParam, setLocalParams } = useDebouncedParams(
    queryParams,
    2000,
    onParamsChange
  );

  const hasActiveFilters = !!(
    queryParams.search || 
    queryParams.status || 
    queryParams.email ||
    queryParams.paymentMethod ||
    queryParams.startDate ||
    queryParams.endDate
  );

  const handleClearFilters = () => {
    setLocalParams({
      ...localParams,
      search: undefined,
      status: undefined,
      email: undefined,
      paymentMethod: undefined,
      startDate: undefined,
      endDate: undefined,
      page: 1
    });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Tìm kiếm đơn hàng
          </label>
          <input
            type="text"
            placeholder="Tìm theo tên user hoặc tên phim... "
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.search || ""}
            onChange={(e) => updateLocalParam("search", e.target.value)}
          />
        </div>
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-input rounded-md hover:bg-accent transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4 bg-card rounded-lg border">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Trạng thái 
          </label>
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.status || ""}
            onChange={(e) => updateLocalParam("status", e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="success">Thành công</option>
            <option value="failed">Thất bại</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email 
          </label>
          <input
            type="email"
            placeholder="Tìm theo email..."
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.email || ""}
            onChange={(e) => updateLocalParam("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phương thức thanh toán
          </label>
           <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" value={localParams.paymentMethod || ""} onChange={(e) => updateLocalParam("paymentMethod", e.target.value)}>
            <option value="">Tất cả phương thức</option>
            <option value="momo">Momo</option>
            <option value="paypal">PayPal</option>
            <option value="visa">Visa</option>
            <option value="vnpay">VnPay</option>
            <option value="zalopay">ZaloPay</option>
           </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Từ ngày 
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.startDate || ""}
            onChange={(e) => updateLocalParam("startDate", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Đến ngày 
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.endDate || ""}
            onChange={(e) => updateLocalParam("endDate", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Số lượng / trang
          </label>
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.take || 10}
            onChange={(e) => updateLocalParam("take", Number(e.target.value))}
          >
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
            <option value={50}>50 / trang</option>
          </select>
        </div>
      </div>

     
    </div>
  );
}
