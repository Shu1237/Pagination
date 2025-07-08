import { useState } from "react";
import { useActor } from "@/hook/useActor";
import type { ActorQueryType } from "@/utils/type";
import { PersonStanding } from 'lucide-react';
// Components
import ActorFilters from "@/components/actor/ActorFilters";
import ActorTable from "@/components/actor/ActorTable";
import HeaderSection from "@/components/base/baseHeaderSection";
import BasePagination from "@/components/base/basePagination";
import BaseEmptyState from "@/components/base/baseEmptyState";
import BaseLoading, { BaseErrorProps } from "@/components/base/baseState";

export default function ActorPage() {
  const [queryParams, setQueryParams] = useState<ActorQueryType>({
    page: 1,
    take: 10,
  });

  const { data, isLoading, isError, refetch } = useActor(queryParams);

  // Helpers
  const actors = data?.data?.data || [];
  const meta = data?.data?.meta;

  const hasFilters = Boolean(
    queryParams.search ||
    queryParams.name ||
    queryParams.stage_name ||
    queryParams.gender ||
    queryParams.nationality ||
    queryParams.date_of_birth
  );

  // Handlers
  const handleParamsChange = (newParams: Partial<ActorQueryType>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

  const handlePageChange = (page: number) => {
    handleParamsChange({ page });
  };

  const handleSort = (sortBy: string) => {
    handleParamsChange({
      sortBy,
      sortOrder: queryParams.sortOrder === "ASC" ? "DESC" : "ASC",
    });
  };

  const handleClearFilters = () => {
    setQueryParams({ page: 1, take: 10 });
  };

  // Render states
  if (isLoading) return <BaseLoading />;
  if (isError) return <BaseErrorProps onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <HeaderSection
        title="Quản lý Diễn viên"
        description="Quản lý thông tin diễn viên trong hệ thống"
      />

      {/* Filters */}
      <ActorFilters
        queryParams={queryParams}
        onParamsChange={handleParamsChange}
      />

      {/* Table or Empty */}
      {actors.length > 0 ? (
        <ActorTable
          actors={actors}
          onSort={handleSort}
          currentSortBy={queryParams.sortBy}
          currentSortOrder={queryParams.sortOrder}
        />
      ) : (
        <BaseEmptyState
          icon={<PersonStanding className="w-8 h-8 text-muted-foreground" />}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          message="Không tìm thấy diễn viên nào"
          noDataMessage="Hiện tại chưa có dữ liệu diễn viên trong hệ thống"
          filterMessage="Thử điều chỉnh bộ lọc hoặc tìm kiếm để tìm kết quả phù hợp"
        />
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <BasePagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          totalItems={meta.total}
          itemsPerPage={queryParams.take ?? 10}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
