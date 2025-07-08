
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import type { OverviewOrder } from "@/utils/type";

interface OrderOverviewProps {
  data?: OverviewOrder;
}

export default function OrderOverview({ data }: OrderOverviewProps) {
  if (!data) {
    return (
      <Card className="border-destructive dark:border-destructive bg-card dark:bg-card">
        <CardContent className="p-4 text-center">
          <p className="text-destructive dark:text-destructive text-sm">Không thể tải dữ liệu đơn hàng</p>
        </CardContent>
      </Card>
    );
  }
  // Format currency
  const formatCurrency = (amount: string) => {
    const numericAmount = parseFloat(amount);
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(numericAmount);
  };

  // Data for Pie Chart
  const pieData = [
    { name: "Thành công", value: data.totalSuccess, color: "#10b981" },
    { name: "Thất bại", value: data.totalFailed, color: "#ef4444" },
    { name: "Chờ xử lý", value: data.totalPending, color: "#f59e0b" }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = data.totalOrders > 0 ? Math.round((item.value / data.totalOrders) * 100) : 0;
      return (
        <div className="bg-background dark:bg-background border border-border dark:border-border rounded-lg p-2 shadow-lg">
          <p className="font-medium text-sm text-foreground dark:text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground">
            {item.value.toLocaleString()} đơn ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Ensure chart always displays even with zero data
  const displayData = data.totalOrders === 0 ? [
    { name: "Chưa có dữ liệu", value: 1, color: "#e5e7eb" }
  ] : pieData;

  return (
    <Card className="bg-card dark:bg-card border-border dark:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground dark:text-foreground">
            <ShoppingCart className="h-5 w-5 text-primary dark:text-primary" />
            Thống kê đơn hàng
          </CardTitle>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data.totalOrders.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">Tổng đơn hàng</p>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              {formatCurrency(data.revenue)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={data.totalOrders === 0 ? 0 : 5}
                dataKey="value"
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {data.totalOrders > 0 && <Tooltip content={<CustomTooltip />} />}
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          {data.totalOrders === 0 ? (
            <div className="text-center text-muted-foreground dark:text-muted-foreground">
              <p className="text-sm">Chưa có dữ liệu đơn hàng</p>
            </div>
          ) : (
            pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-foreground dark:text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                  ({((item.value / data.totalOrders) * 100).toFixed(1)}%)
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
