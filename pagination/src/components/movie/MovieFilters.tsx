import type { MovieQueryType } from "@/utils/type";
import { useDebouncedParams } from "@/hook/useDebounce";

interface MovieFiltersProps {
  queryParams: MovieQueryType;
  onParamsChange: (params: Partial<MovieQueryType>) => void;
}

export default function MovieFilters({ queryParams, onParamsChange }: MovieFiltersProps) {
  const { localParams, updateLocalParam, setLocalParams } = useDebouncedParams(
    queryParams,
    2000,
    onParamsChange
  );

  const hasActiveFilters = !!(
    queryParams.search || 
    queryParams.director || 
    queryParams.nation || 
    queryParams.fromDate || 
    queryParams.toDate
  );

  const handleClearFilters = () => {
    setLocalParams({
      search: undefined,
      director: undefined,
      nation: undefined,
      fromDate: undefined,
      toDate: undefined,
      page: 1,
      take: queryParams.take || 10
    });
  };


  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Tìm kiếm phim
          </label>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên phim, đạo diễn, quốc gia... "
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.search || ""}
            onChange={(e) => updateLocalParam('search', e.target.value)}
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
            Đạo diễn
          </label>
          <input
            type="text"
            placeholder="Nhập tên đạo diễn..."
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.director || ""}
            onChange={(e) => updateLocalParam('director', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Quốc gia
          </label>
          <input
            type="text"
            placeholder="Nhập quốc gia..."
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.nation || ""}
            onChange={(e) => updateLocalParam('nation', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Từ ngày chiếu
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.fromDate || ""}
            onChange={(e) => updateLocalParam('fromDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Đến ngày chiếu
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.toDate || ""}
            onChange={(e) => updateLocalParam('toDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Số lượng / trang
          </label>
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.take || 10}
            onChange={(e) => updateLocalParam('take', Number(e.target.value))}
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
