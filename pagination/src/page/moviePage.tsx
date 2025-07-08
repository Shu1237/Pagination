import { useState } from "react";
import { useMovie } from "@/hook/useMovie";
import type { MovieQueryType } from "@/utils/type";
import { Clapperboard } from 'lucide-react';
// Components
import MovieFilters from "@/components/movie/MovieFilters";
import MovieTable from "@/components/movie/MovieTable";
import HeaderSection from "@/components/base/baseHeaderSection";
import BasePagination from "@/components/base/basePagination";
import BaseEmptyState from "@/components/base/baseEmptyState";
import BaseLoading, { BaseErrorProps } from "@/components/base/baseState";

export default function MoviePage() {
  const [queryParams, setQueryParams] = useState<MovieQueryType>({
    page: 1,
    take: 10,
  });

  const { data, isLoading, isError, refetch } = useMovie(queryParams);

  const movies = data?.data?.data || [];
  const meta = data?.data?.meta;

  const hasFilters = Boolean(
    queryParams.search ||
    queryParams.director ||
    queryParams.nation ||
    queryParams.fromDate ||
    queryParams.toDate
  );

  const handleParamsChange = (newParams: Partial<MovieQueryType>) => {
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

  if (isLoading) return <BaseLoading />;
  if (isError) return <BaseErrorProps onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <HeaderSection
        title="Quản lý Phim"
        description="Quản lý thông tin phim trong hệ thống"
      />

      <MovieFilters
        queryParams={queryParams}
        onParamsChange={handleParamsChange}
      />

      {movies.length > 0 ? (
        <MovieTable
          movies={movies}
          onSort={handleSort}
          currentSortBy={queryParams.sortBy}
          currentSortOrder={queryParams.sortOrder}
        />
      ) : (
        <BaseEmptyState
          icon={<Clapperboard className="w-8 h-8 text-muted-foreground" />}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          message="Không tìm thấy phim nào"
          noDataMessage="Hiện tại chưa có phim nào trong hệ thống"
          filterMessage="Thử điều chỉnh bộ lọc hoặc tìm kiếm để tìm kết quả phù hợp"
        />
      )}

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
