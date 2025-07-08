

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Ticket } from "lucide-react";
import type { OverviewTicket } from "@/utils/type";

interface TicketOverviewChartProps {
  data?: OverviewTicket;
}

export default function TicketOverviewChart({ data }: TicketOverviewChartProps) {
  if (!data) {
    return (
      <Card className="border-destructive dark:border-destructive bg-card dark:bg-card">
        <CardContent className="p-4 text-center">
          <p className="text-destructive dark:text-destructive text-sm">Không thể tải dữ liệu vé</p>
        </CardContent>
      </Card>
    );
  }

  const totalTickets = data.totalTickets || 0;
  const activeTickets = data.totalAvailable || 0;
  const usedTickets = data.totalUsed || 0;

  // Data for Pie Chart
  const pieData = [
    { name: "Đang hoạt động", value: activeTickets, color: "#10b981" },
    { name: "Đã sử dụng", value: usedTickets, color: "#f59e0b" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = totalTickets > 0 ? Math.round((data.value / totalTickets) * 100) : 0;
      return (
        <div className="bg-background dark:bg-background border border-border dark:border-border rounded-lg p-2 shadow-lg">
          <p className="font-medium text-sm text-foreground dark:text-foreground">{data.name}</p>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground">
            {data.value.toLocaleString()} vé ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Ensure chart always displays even with zero data
  const displayData = totalTickets === 0 ? [
    { name: "Chưa có dữ liệu", value: 1, color: "#e5e7eb" }
  ] : pieData;

  return (
    <Card className="bg-card dark:bg-card border-border dark:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground dark:text-foreground">
            <Ticket className="h-5 w-5 text-primary dark:text-primary" />
            Thống kê vé
          </CardTitle>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTickets.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">Tổng vé</p>
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
                paddingAngle={totalTickets === 0 ? 0 : 5}
                dataKey="value"
              >
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {totalTickets > 0 && <Tooltip content={<CustomTooltip />} />}
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          {totalTickets === 0 ? (
            <div className="text-center text-muted-foreground dark:text-muted-foreground">
              <p className="text-sm">Chưa có dữ liệu vé</p>
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
                  ({((item.value / totalTickets) * 100).toFixed(1)}%)
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
