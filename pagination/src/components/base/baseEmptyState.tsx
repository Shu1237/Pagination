interface BaseEmptyStateProps {
  icon?: React.ReactNode;
  message?: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
  noDataMessage?: string;
  filterMessage?: string;
}

export default function BaseEmptyState({
  icon,
  message,
  hasFilters = false,
  onClearFilters,
  noDataMessage,
  filterMessage,
}: BaseEmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
          {icon ?? (
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 9.75h.008v.008H9.75V9.75zm0 0H9.75V9.75zm4.5 0h.008v.008H14.25V9.75zm0 0H14.25V9.75zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">{message ?? "Không tìm thấy dữ liệu"}</h3>
        {hasFilters ? (
          <div>
            <p className="text-muted-foreground mb-4">{filterMessage ?? "Không tìm thấy kết quả phù hợp"}</p>
            {onClearFilters && (
              <button
                onClick={onClearFilters}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">{noDataMessage ?? "Hiện tại chưa có dữ liệu trong hệ thống"}</p>
        )}
      </div>
    </div>
  );
}
