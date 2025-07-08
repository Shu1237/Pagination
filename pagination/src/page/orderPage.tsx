import { useOrder } from "@/hook/useOrder";
import type { OrderQueryType } from "@/utils/type";
import { useState } from "react";
import { ListOrdered } from 'lucide-react';
// Components
import OrderFilters from "@/components/order/OrderFilters";
import OrderTable from "@/components/order/OrderTable";
import HeaderSection from "@/components/base/baseHeaderSection";
import BasePagination from "@/components/base/basePagination";
import BaseEmptyState from "@/components/base/baseEmptyState";
import BaseLoading, { BaseErrorProps } from "@/components/base/baseState";

export default function OrderPage() {
  const [queryParams, setQueryParams] = useState<OrderQueryType>({
    page: 1,
    take: 10,
  });

  const { data, isLoading, isError, refetch } = useOrder(queryParams);

  const orders = data?.data?.data || [];
  const meta = data?.data?.meta;

  const hasFilters = Boolean(
    queryParams.search ||
    queryParams.status ||
    queryParams.email ||
    queryParams.paymentMethod ||
    queryParams.startDate ||
    queryParams.endDate
  );

  const handleParamsChange = (newParams: Partial<OrderQueryType>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

  const handlePageChange = (page: number) => {
    handleParamsChange({ page });
  };

  const handleSort = (sortBy: string) => {
    handleParamsChange({
      sortBy,
      sortOrder: queryParams.sortOrder === "ASC" ? "DESC" : "ASC",
      page: 1,
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
        title="Quản lý Đơn hàng"
        description="Quản lý đơn hàng và theo dõi trạng thái thanh toán"
      />

      <OrderFilters
        queryParams={queryParams}
        onParamsChange={handleParamsChange}
      />

      {orders.length > 0 ? (
        <OrderTable
          orders={orders}
          onSort={handleSort}
          currentSortBy={queryParams.sortBy}
          currentSortOrder={queryParams.sortOrder}
        />
      ) : (
        <BaseEmptyState
          icon={<ListOrdered className="w-8 h-8 text-muted-foreground" />}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          message="Không tìm thấy đơn hàng nào"
          noDataMessage="Hiện tại chưa có dữ liệu đơn hàng trong hệ thống"
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
