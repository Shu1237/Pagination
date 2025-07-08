import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ScheduleResponse } from "@/utils/type";

interface ScheduleTableProps {
  schedules: ScheduleResponse[];
  onSort: (sortBy: string) => void;
  currentSortBy?: string;
  currentSortOrder?: 'ASC' | 'DESC';
}

export default function ScheduleTable({ schedules, onSort, currentSortBy, currentSortOrder }: ScheduleTableProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getSortIcon = (field: string) => {
    if (currentSortBy !== field) {
      return (
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return currentSortOrder === 'ASC' ? (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("schedule.id")}
            >
              <div className="flex items-center gap-2">
                ID
                {getSortIcon("schedule.id")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("movie.name")}
            >
              <div className="flex items-center gap-2">
                Tên phim
                {getSortIcon("movie.name")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("cinemaRoom.cinema_room_name")}
            >
              <div className="flex items-center gap-2">
                Phòng chiếu
                {getSortIcon("cinemaRoom.cinema_room_name")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("version.id")}
            >
              <div className="flex items-center gap-2">
                Phiên bản
                {getSortIcon("version.id")}
              </div>
            </TableHead>
            <TableHead>Giờ bắt đầu</TableHead>
            <TableHead>Giờ kết thúc</TableHead>
            <TableHead>Ngày chiếu</TableHead>
            <TableHead>Thời lượng</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => {
            const startTime = new Date(schedule.start_movie_time);
            const endTime = new Date(schedule.end_movie_time);
            const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // minutes
            
            return (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">{schedule.id}</TableCell>
                <TableCell className="font-medium max-w-[200px]">
                  <div className="truncate" title={schedule.movie?.name || 'N/A'}>
                    {schedule.movie?.name || 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Phòng {schedule.cinema_room_id}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                    {schedule.version?.name || 'N/A'}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatTime(schedule.start_movie_time)}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatTime(schedule.end_movie_time)}
                </TableCell>
                <TableCell>
                  {startTime.toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {duration} phút
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    !schedule.is_deleted 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}>
                    {!schedule.is_deleted ? "Hoạt động" : "Đã hủy"}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
