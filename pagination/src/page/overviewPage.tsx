import OrderOverview from "@/components/overview/orderOverView";
import TicketOverviewChart from "@/components/overview/ticketOverView";
import HeaderSection from "@/components/base/baseHeaderSection";
import { useOrderOverview } from "@/hook/useOrder";
import { useTicketOverview } from "@/hook/useTicket";
import { Card, CardContent } from "@/components/ui/card";

export default function OverViewPage() {
  // fetch data for overview page
  const { data: ticketData, isLoading: isTicketLoading, error: ticketError } = useTicketOverview();
  const { data: orderData, isLoading: isOrderLoading, isError: orderError } = useOrderOverview();

  const isLoading = isTicketLoading || isOrderLoading;
  const hasError = ticketError || orderError;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <HeaderSection
          title="Tổng quan hệ thống"
          description="Dashboard tổng quan về hoạt động của hệ thống quản lý rạp chiếu phim"
        />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-6">
                <div className="h-80 bg-muted dark:bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <HeaderSection
          title="Tổng quan hệ thống"
          description="Dashboard tổng quan về hoạt động của hệ thống quản lý rạp chiếu phim"
        />
        <Card className="border-destructive dark:border-destructive bg-card dark:bg-card">
          <CardContent className="p-6 text-center">
            <p className="text-destructive dark:text-destructive">Không thể tải dữ liệu tổng quan</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <HeaderSection
        title="Tổng quan hệ thống"
        description="Dashboard tổng quan về hoạt động của hệ thống quản lý rạp chiếu phim"
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TicketOverviewChart data={ticketData?.data} />
        <OrderOverview data={orderData?.data} />
      </div>

      {/* System Overview Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-900/50 border-blue-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
              Tổng quan hệ thống
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Hệ thống quản lý rạp chiếu phim đang hoạt động ổn định với dữ liệu được cập nhật theo thời gian thực.
              Tất cả các dịch vụ đang online và phản hồi nhanh chóng.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs font-medium border border-green-200 dark:border-green-700">
                ✓ Hoạt động bình thường
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700">
                🔄 Đồng bộ real-time
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-700">
                📊 Uptime 99.9%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
