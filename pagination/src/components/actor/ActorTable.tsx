import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ActorResponse } from "@/utils/type";

interface ActorTableProps {
  actors: ActorResponse[];
  onSort: (sortBy: string) => void;
  currentSortBy?: string;
  currentSortOrder?: 'ASC' | 'DESC';
}

export default function ActorTable({ actors, onSort, currentSortBy, currentSortOrder }: ActorTableProps) {
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
            <TableHead>Avatar</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("name")}
            >
              <div className="flex items-center gap-2">
                Tên thật
                {getSortIcon("name")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("stage_name")}
            >
              <div className="flex items-center gap-2">
                Nghệ danh
                {getSortIcon("stage_name")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("gender")}
            >
              <div className="flex items-center gap-2">
                Giới tính
                {getSortIcon("gender")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("date_of_birth")}
            >
              <div className="flex items-center gap-2">
                Ngày sinh
                {getSortIcon("date_of_birth")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSort("nationality")}
            >
              <div className="flex items-center gap-2">
                Quốc tịch
                {getSortIcon("nationality")}
              </div>
            </TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actors.map((actor) => (
            <TableRow key={actor.id}>
              <TableCell>
                <div className="w-12 h-12 rounded-full overflow-hidden bg-accent">
                  {actor.profile_image ? (
                    <img
                      src={actor.profile_image}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">{actor.name}</TableCell>
              <TableCell>{actor.stage_name}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  actor.gender === 'male' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                }`}>
                  {actor.gender === 'male' ? 'Nam' : 'Nữ'}
                </span>
              </TableCell>
              <TableCell>{formatDate(actor.date_of_birth)}</TableCell>
              <TableCell>{actor.nationality}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(actor.created_at)}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  !actor.is_deleted 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {!actor.is_deleted ? 'Hoạt động' : 'Đã xóa'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
