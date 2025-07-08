import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TicketResponse } from "@/utils/type";

interface TicketTableProps {
  tickets: TicketResponse[];
  onSort: (sortBy: string) => void;
  currentSortBy?: string;
  currentSortOrder?: 'ASC' | 'DESC';
}

export default function TicketTable({ tickets, onSort, currentSortBy, currentSortOrder }: TicketTableProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
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
            <TableHead>Phim</TableHead>
            <TableHead>Phòng chiếu</TableHead>
            <TableHead>Ghế</TableHead>
            <TableHead>Loại ghế</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("ticketType.id")}
            >
              <div className="flex items-center gap-2">
                Loại vé
                {getSortIcon("ticketType.id")}
              </div>
            </TableHead>
            <TableHead>Phiên bản</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("schedule.id")}
            >
              <div className="flex items-center gap-2">
                Thời gian chiếu
                {getSortIcon("schedule.id")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("ticket.is_used")}
            >
              <div className="flex items-center gap-2">
                Tình trạng
                {getSortIcon("ticket.is_used")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("ticket.status")}
            >
              <div className="flex items-center gap-2">
                Trạng thái
                {getSortIcon("ticket.status")}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium max-w-[200px]">
                <div className="truncate" title={ticket.schedule?.movie?.name || 'N/A'}>
                  {ticket.schedule?.movie?.name || 'N/A'}
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {ticket.schedule?.cinemaRoom?.name || 'N/A'}
                </span>
              </TableCell>
              <TableCell className="font-mono">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {ticket.seat?.row}{ticket.seat?.column}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  {ticket.seat_type?.name || 'N/A'}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 w-fit">
                    {ticket.ticketType?.name || 'N/A'}
                  </span>
                  {/* <span className="text-xs text-muted-foreground">
                    {ticket.ticketType?.audience_type || ''}
                  </span> */}
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                  {ticket.schedule?.version?.name || 'N/A'}
                </span>
              </TableCell>
              <TableCell className="text-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-mono font-medium">
                    {ticket.schedule?.start_movie_time ? formatTime(ticket.schedule.start_movie_time) : 'N/A'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {ticket.schedule?.start_movie_time ? formatDate(ticket.schedule.start_movie_time) : ''}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.is_used 
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" 
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }`}>
                  {ticket.is_used ? "Đã sử dụng" : "Chưa sử dụng"}
                </span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.status 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                }`}>
                  {ticket.status ? "Hoạt động" : "Không hoạt động"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
