import { useState } from "react";
import { useTicket } from "@/hook/useTicket";
import type { TicketQueryType } from "@/utils/type";
import { Ticket } from 'lucide-react';
// Components
import TicketFilters from "@/components/ticket/TicketFilters";
import TicketTable from "@/components/ticket/TicketTable";
import HeaderSection from "@/components/base/baseHeaderSection";
import BasePagination from "@/components/base/basePagination";
import BaseEmptyState from "@/components/base/baseEmptyState";
import BaseLoading, { BaseErrorProps } from "@/components/base/baseState";

export default function TicketPage() {
  const [queryParams, setQueryParams] = useState<TicketQueryType>({
    page: 1,
    take: 10,
    active: true,
    is_used: false,
  });

  const { data, isLoading, isError, refetch } = useTicket(queryParams);

  const tickets = data?.data?.data || [];
  const meta = data?.data?.meta;

  const hasFilters = Boolean(
    queryParams.search ||
    queryParams.active !== undefined ||
    queryParams.is_used !== undefined
  );

  const handleParamsChange = (newParams: Partial<TicketQueryType>) => {
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
      active: true,
      is_used: false,
    });
  };

  if (isLoading) return <BaseLoading />;
  if (isError) return <BaseErrorProps onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <HeaderSection
        title="Quản lý vé"
        description="Danh sách vé đã đặt"
      />

      <TicketFilters
        queryParams={queryParams}
        onParamsChange={handleParamsChange}
      />

      {tickets.length > 0 ? (
        <TicketTable
          tickets={tickets}
          onSort={handleSort}
          currentSortBy={queryParams.sortBy}
          currentSortOrder={queryParams.sortOrder}
        />
      ) : (
        <BaseEmptyState
          icon={<Ticket className="w-8 h-8 text-muted-foreground" />}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          message="Không tìm thấy vé nào"
          noDataMessage="Hiện tại chưa có vé nào trong hệ thống"
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
