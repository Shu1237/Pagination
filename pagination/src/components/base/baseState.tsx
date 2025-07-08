import { Button } from "@/components/ui/button";

interface BaseLoadingProps {
  message?: string;
}

export default function BaseLoading({ message = "Đang tải dữ liệu..." }: BaseLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

interface BaseErrorProps {
  message?: string;
  onRetry: () => void;
}

export function BaseErrorProps({ message = "Có lỗi xảy ra khi tải dữ liệu", onRetry }: BaseErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-destructive mb-4">{message}</p>
        <Button onClick={onRetry}>Thử lại</Button>
      </div>
    </div>
  );
}
