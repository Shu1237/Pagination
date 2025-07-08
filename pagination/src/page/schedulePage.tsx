import { useState } from "react";
import { useSchedule } from "@/hook/useSchedule";
import type { ScheduleQueryType } from "@/utils/type";
import { CalendarCheck } from 'lucide-react';
// Components
import ScheduleFilters from "@/components/schedule/ScheduleFilters";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import HeaderSection from "@/components/base/baseHeaderSection";
import BasePagination from "@/components/base/basePagination";
import BaseEmptyState from "@/components/base/baseEmptyState";
import BaseLoading, { BaseErrorProps } from "@/components/base/baseState";

export default function SchedulePage() {
  const [queryParams, setQueryParams] = useState<ScheduleQueryType>({
    page: 1,
    take: 10,
  });

  const { data, isLoading, isError, refetch } = useSchedule(queryParams);

  const schedules = data?.data?.data || [];
  const meta = data?.data?.meta;

  const hasFilters = Boolean(
    queryParams.search ||
    queryParams.movieName ||
    queryParams.cinemaRoomName ||
    queryParams.version_id !== undefined ||
    queryParams.is_deleted !== undefined ||
    queryParams.scheduleStartTime ||
    queryParams.scheduleEndTime
  );

  const handleParamsChange = (newParams: Partial<ScheduleQueryType>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

  const handleSort = (sortBy: string) => {
    handleParamsChange({
      sortBy,
      sortOrder: queryParams.sortOrder === "ASC" ? "DESC" : "ASC",
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    handleParamsChange({ page });
  };

  const handleClearFilters = () => {
    setQueryParams({
      page: 1,
      take: 10,
    });
  };

  if (isLoading) return <BaseLoading />;
  if (isError) return <BaseErrorProps onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <HeaderSection
        title="Quản lý Lịch chiếu"
        description="Quản lý lịch chiếu phim trong hệ thống"
      />

      <ScheduleFilters
        queryParams={queryParams}
        onParamsChange={handleParamsChange}
      />

      {schedules.length > 0 ? (
        <ScheduleTable
          schedules={schedules}
          onSort={handleSort}
          currentSortBy={queryParams.sortBy}
          currentSortOrder={queryParams.sortOrder}
        />
      ) : (
        <BaseEmptyState
          icon={<CalendarCheck className="w-8 h-8 text-muted-foreground" />}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          message="Không tìm thấy lịch chiếu nào"
          noDataMessage="Hiện tại chưa có lịch chiếu nào trong hệ thống"
          filterMessage="Thử điều chỉnh bộ lọc hoặc tìm kiếm để tìm kết quả phù hợp"
        />
      )}

      {meta && meta.totalPages > 1 && (
        <BasePagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          totalItems={meta.total}
          itemsPerPage={queryParams.take || 10}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
