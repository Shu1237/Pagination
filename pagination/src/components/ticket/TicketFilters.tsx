import type { TicketQueryType } from "@/utils/type";
import { useDebouncedParams } from "@/hook/useDebounce";

interface TicketFiltersProps {
  queryParams: TicketQueryType;
  onParamsChange: (params: Partial<TicketQueryType>) => void;
}

export default function TicketFilters({ queryParams, onParamsChange }: TicketFiltersProps) {
  const { localParams, updateLocalParam, setLocalParams } = useDebouncedParams(
    queryParams,
    2000,
    onParamsChange
  );

  const hasActiveFilters = !!(
    queryParams.search || 
    queryParams.active !== undefined || 
    queryParams.is_used !== undefined ||
    queryParams.startDate ||
    queryParams.endDate
  );

  const handleClearFilters = () => {
    setLocalParams({
      ...localParams,
      search: undefined,
      active: undefined,
      is_used: undefined,
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
            Tìm kiếm vé
          </label>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên phim, loại ghế, phòng chiếu, loại vé, phiên bản... "
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-card rounded-lg border">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Trạng thái vé
          </label>
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={
              localParams.active === undefined 
                ? "all" 
                : localParams.active === true 
                  ? "active" 
                  : "inactive"
            }
            onChange={(e) => {
              const value = e.target.value;
              updateLocalParam("active", 
                value === "all" ? undefined : 
                value === "active" ? true : false
              );
            }}
          >
            <option value="all">Tất cả</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tình trạng sử dụng
          </label>
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={
              localParams.is_used === undefined 
                ? "all" 
                : localParams.is_used === true 
                  ? "used" 
                  : "unused"
            }
            onChange={(e) => {
              const value = e.target.value;
              updateLocalParam("is_used", 
                value === "all" ? undefined : 
                value === "used" ? true : false
              );
            }}
          >
            <option value="all">Tất cả</option>
            <option value="used">Đã sử dụng</option>
            <option value="unused">Chưa sử dụng</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Từ ngày đặt
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
            Đến ngày đặt
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
