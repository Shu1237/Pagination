import type { ScheduleQueryType } from "@/utils/type";
import { useState, useEffect, useCallback } from "react";

interface ScheduleFiltersProps {
  queryParams: ScheduleQueryType;
  onParamsChange: (params: Partial<ScheduleQueryType>) => void;
}

export default function ScheduleFilters({ queryParams, onParamsChange }: ScheduleFiltersProps) {
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

  const handleMovieNameChange = (movieName: string) => {
    onParamsChange({ movieName: movieName || undefined, page: 1 });
  };

  const handleCinemaRoomNameChange = (cinemaRoomName: string) => {
    onParamsChange({ cinemaRoomName: cinemaRoomName || undefined, page: 1 });
  };

  const handleVersionIdChange = (version_id: number | undefined) => {
    onParamsChange({ version_id, page: 1 });
  };

  const handleIsDeletedChange = (is_deleted: boolean | undefined) => {
    onParamsChange({ is_deleted, page: 1 });
  };

  const handleScheduleStartTimeChange = (scheduleStartTime: string) => {
    onParamsChange({ scheduleStartTime: scheduleStartTime || undefined, page: 1 });
  };

  const handleScheduleEndTimeChange = (scheduleEndTime: string) => {
    onParamsChange({ scheduleEndTime: scheduleEndTime || undefined, page: 1 });
  };

  const hasActiveFilters = !!(
    queryParams.search || 
    queryParams.movieName || 
    queryParams.cinemaRoomName ||
    queryParams.version_id !== undefined ||
    queryParams.is_deleted !== undefined ||
    queryParams.scheduleStartTime ||
    queryParams.scheduleEndTime
  );

  const handleClearFilters = () => {
    setSearchInput("");
    onParamsChange({
      search: undefined,
      movieName: undefined,
      cinemaRoomName: undefined,
      version_id: undefined,
      is_deleted: undefined,
      scheduleStartTime: undefined,
      scheduleEndTime: undefined,
      page: 1
    });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Tìm kiếm lịch chiếu
          </label>
          <input
            type="text"
            placeholder="Tìm kiếm theo ID lịch chiếu, tên phim, phòng chiếu... "
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
      <div className="space-y-4">
        {/* First row: Tên phim, Phòng chiếu, Phiên bản, Trạng thái */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-card rounded-lg border">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tên phim
            </label>
            <input
              type="text"
              placeholder="Lọc theo tên phim"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={queryParams.movieName || ""}
              onChange={(e) => handleMovieNameChange(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phòng chiếu
            </label>
            <input
              type="text"
              placeholder="Lọc theo phòng chiếu"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={queryParams.cinemaRoomName || ""}
              onChange={(e) => handleCinemaRoomNameChange(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phiên bản
            </label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={queryParams.version_id || ""}
              onChange={(e) => handleVersionIdChange(e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">Tất cả phiên bản</option>
              <option value="2">2D</option>
              <option value="1">3D</option>
              <option value="6">IMAX</option>
              <option value="4">4DX</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Trạng thái
            </label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={queryParams.is_deleted === undefined ? "all" : queryParams.is_deleted ? "deleted" : "active"}
              onChange={(e) => {
                const value = e.target.value;
                handleIsDeletedChange(value === "all" ? undefined : value === "deleted");
              }}
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="deleted">Đã xóa</option>
            </select>
          </div>
        </div>

        {/* Second row: Thời gian bắt đầu, Thời gian kết thúc, Số lượng / trang */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-card rounded-lg border">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Thời gian bắt đầu
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={queryParams.scheduleStartTime || ""}
              onChange={(e) => handleScheduleStartTimeChange(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Thời gian kết thúc
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={queryParams.scheduleEndTime || ""}
              onChange={(e) => handleScheduleEndTimeChange(e.target.value)}
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

      {/* Sort Info */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          💡 Có thể sắp xếp theo: ID lịch chiếu, Tên phim, Phiên bản, Phòng chiếu, Thời gian
        </div>
        <div>
          {queryParams.sortBy && (
            <span>
              Sắp xếp: {queryParams.sortBy} ({queryParams.sortOrder || "asc"})
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
