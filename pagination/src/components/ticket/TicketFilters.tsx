import type { TicketQueryType } from "@/utils/type";
import { useState, useEffect, useCallback } from "react";

interface TicketFiltersProps {
  queryParams: TicketQueryType;
  onParamsChange: (params: Partial<TicketQueryType>) => void;
}

export default function TicketFilters({ queryParams, onParamsChange }: TicketFiltersProps) {
  const [searchInput, setSearchInput] = useState(queryParams.search || "");

  // Debounce search với 2 giây
  const debounceSearch = useCallback(
    (searchValue: string) => {
      const timer = setTimeout(() => {
        onParamsChange({ search: searchValue || undefined, page: 1 });
      }, 2000);
      return () => clearTimeout(timer);
    },
    [onParamsChange]
  );

  useEffect(() => {
    const cleanup = debounceSearch(searchInput);
    return cleanup;
  }, [searchInput, debounceSearch]);

  const handleTakeChange = (take: number) => {
    onParamsChange({ take, page: 1 });
  };

  const handleActiveChange = (active: boolean | undefined) => {
    onParamsChange({ active, page: 1 });
  };

  const handleIsUsedChange = (is_used: boolean | undefined) => {
    onParamsChange({ is_used, page: 1 });
  };

  const handleStartDateChange = (startDate: string) => {
    onParamsChange({ startDate: startDate || undefined, page: 1 });
  };

  const handleEndDateChange = (endDate: string) => {
    onParamsChange({ endDate: endDate || undefined, page: 1 });
  };

  const hasActiveFilters = !!(
    queryParams.search || 
    queryParams.active !== undefined || 
    queryParams.is_used !== undefined ||
    queryParams.startDate ||
    queryParams.endDate
  );

  const handleClearFilters = () => {
    setSearchInput("");
    onParamsChange({
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
            value={queryParams.active === undefined ? "all" : queryParams.active ? "active" : "inactive"}
            onChange={(e) => {
              const value = e.target.value;
              handleActiveChange(value === "all" ? undefined : value === "active");
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
            value={queryParams.is_used === undefined ? "all" : queryParams.is_used ? "used" : "unused"}
            onChange={(e) => {
              const value = e.target.value;
              handleIsUsedChange(value === "all" ? undefined : value === "used");
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
            value={queryParams.startDate || ""}
            onChange={(e) => handleStartDateChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Đến ngày đặt
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={queryParams.endDate || ""}
            onChange={(e) => handleEndDateChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Số lượng / trang
          </label>
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={queryParams.take || 10}
            onChange={(e) => handleTakeChange(Number(e.target.value))}
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
