

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Film, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          {/* Large 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="h-16 w-16 text-blue-500/30 animate-pulse" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Trang không tìm thấy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển đi nơi khác.
            </p>
          </div>

          {/* Suggestions */}
          <div className="mb-8 p-6 bg-blue-50 dark:bg-gray-700/50 rounded-xl border border-blue-100 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center justify-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Có thể bạn muốn:
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Kiểm tra lại đường dẫn URL</li>
              <li>• Quay về trang chủ để tiếp tục</li>
              <li>• Sử dụng thanh điều hướng phía trên</li>
              <li>• Liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGoHome}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Home className="h-5 w-5 mr-2" />
              Về trang chủ
            </Button>
            
            <Button 
              onClick={handleGoBack}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Quay lại
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-8 opacity-20">
            <Film className="h-8 w-8 text-blue-500 animate-bounce" style={{ animationDelay: '0s' }} />
            <Film className="h-6 w-6 text-purple-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Film className="h-10 w-10 text-indigo-500 animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
