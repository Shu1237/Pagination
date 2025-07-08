import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { MovieResponse } from "@/utils/type";

interface MovieTableProps {
  movies: MovieResponse[];
  onSort: (sortBy: string) => void;
  currentSortBy?: string;
  currentSortOrder?: 'ASC' | 'DESC';
}

interface MovieDetailModalProps {
  movie: MovieResponse;
  isOpen: boolean;
  onClose: () => void;
}

function MovieDetailModal({ movie, isOpen, onClose }: MovieDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Chi tiết phim</h2>
          <Button variant="outline" onClick={onClose}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Poster */}
          <div>
            {movie.thumbnail && (
              <img
                src={movie.thumbnail}
                alt={movie.name}
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            )}
          </div>
          
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Thông tin cơ bản</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Tên phim:</span> {movie.name}</p>
                <p><span className="font-medium">Đạo diễn:</span> {movie.director}</p>
                <p><span className="font-medium">Quốc gia:</span> {movie.nation}</p>
                <p><span className="font-medium">Thời lượng:</span> {movie.duration} phút</p>
                <p><span className="font-medium">Độ tuổi:</span> {movie.limited_age}</p>
                <p><span className="font-medium">Công ty sản xuất:</span> {movie.production_company}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Lịch chiếu</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Từ ngày:</span> {new Date(movie.from_date).toLocaleDateString("vi-VN")}</p>
                <p><span className="font-medium">Đến ngày:</span> {new Date(movie.to_date).toLocaleDateString("vi-VN")}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Nội dung */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Nội dung</h3>
          <p className="text-muted-foreground leading-relaxed">{movie.content}</p>
        </div>
        
        {/* Diễn viên */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Diễn viên ({movie.actors.length})</h3>
          <div className="flex flex-wrap gap-2">
            {movie.actors.map(actor => (
              <span key={actor.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {actor.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Thể loại */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Thể loại ({movie.gernes.length})</h3>
          <div className="flex flex-wrap gap-2">
            {movie.gernes.map(genre => (
              <span key={genre.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {genre.genre_name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Phiên bản */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Phiên bản ({movie.versions.length})</h3>
          <div className="flex flex-wrap gap-2">
            {movie.versions.map(version => (
              <span key={version.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {version.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Trailer */}
        {movie.trailer && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Trailer</h3>
            <a 
              href={movie.trailer} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Xem trailer
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MovieTable({ movies, onSort, currentSortBy, currentSortOrder }: MovieTableProps) {
  const [selectedMovie, setSelectedMovie] = useState<MovieResponse | null>(null);
  
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
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onSort("movie.id")}
              >
                <div className="flex items-center gap-2">
                  ID
                  {getSortIcon("movie.id")}
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
                onClick={() => onSort("movie.nation")}
              >
                <div className="flex items-center gap-2">
                  Quốc gia
                  {getSortIcon("movie.nation")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onSort("movie.director")}
              >
                <div className="flex items-center gap-2">
                  Đạo diễn
                  {getSortIcon("movie.director")}
                </div>
              </TableHead>
              <TableHead>Số diễn viên</TableHead>
              <TableHead>Số phiên bản</TableHead>
              <TableHead>Ngày khởi chiếu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
              <TableHead>Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell className="font-medium">{movie.id}</TableCell>
                <TableCell className="font-medium max-w-[200px]">
                  <div className="truncate" title={movie.name}>
                    {movie.name}
                  </div>
                </TableCell>
                <TableCell>{movie.nation}</TableCell>
                <TableCell className="max-w-[150px]">
                  <div className="truncate" title={movie.director}>
                    {movie.director}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {movie.actors.length}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {movie.versions.length}
                  </span>
                </TableCell>
                <TableCell>{formatDate(movie.from_date)}</TableCell>
                <TableCell>{formatDate(movie.to_date)}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Xem
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
