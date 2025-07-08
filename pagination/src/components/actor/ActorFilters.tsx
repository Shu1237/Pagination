import type { ActorQueryType } from "@/utils/type";
import { useState, useEffect } from "react";

interface ActorFiltersProps {
    queryParams: ActorQueryType;
    onParamsChange: (params: Partial<ActorQueryType>) => void;
}

export default function ActorFilters({ queryParams, onParamsChange }: ActorFiltersProps) {
    const [searchValue, setSearchValue] = useState(queryParams.search || "");

    // Debounce search với 2 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            onParamsChange({ search: searchValue || undefined, page: 1 });
        }, 2000);

        return () => clearTimeout(timer);
    }, [searchValue, onParamsChange]);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };

    const handleNameChange = (name: string) => {
        onParamsChange({ name: name || undefined, page: 1 });
    };

    const handleStageNameChange = (stage_name: string) => {
        onParamsChange({ stage_name: stage_name || undefined, page: 1 });
    };

    const handleGenderChange = (gender: string) => {
        onParamsChange({
            gender: gender || undefined,
            page: 1
        });
    };

    const handleNationalityChange = (nationality: string) => {
        onParamsChange({
            nationality: nationality || undefined,
            page: 1
        });
    };

    const handleDateOfBirthChange = (date_of_birth: string) => {
        onParamsChange({ date_of_birth: date_of_birth || undefined, page: 1 });
    };

    const handleTakeChange = (take: number) => {
        onParamsChange({ take, page: 1 });
    };

    const hasActiveFilters = !!(
        queryParams.search ||
        queryParams.name ||
        queryParams.stage_name ||
        queryParams.nationality ||
        queryParams.gender ||
        queryParams.date_of_birth
    );

    const handleClearFilters = () => {
        setSearchValue("");
        onParamsChange({
            search: undefined,
            name: undefined,
            stage_name: undefined,
            nationality: undefined,
            gender: undefined,
            date_of_birth: undefined,
            page: 1
        });
    };

    return (
        <div className="space-y-4">
            {/* Search với debounce */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Tìm kiếm diễn viên
                    </label>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, nghệ danh, quốc tịch..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={searchValue}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                {hasActiveFilters && (
                    <div className="flex items-end">
                        <button
                            onClick={handleClearFilters}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-input rounded-md hover:bg-accent transition-colors"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4 bg-card rounded-lg border">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Tên thật
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tên thật..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={queryParams.name || ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Nghệ danh
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập nghệ danh..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={queryParams.stage_name || ""}
                        onChange={(e) => handleStageNameChange(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Quốc tịch
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập quốc tịch..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={queryParams.nationality || ""}
                        onChange={(e) => handleNationalityChange(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Giới tính
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={queryParams.gender || ""}
                        onChange={(e) => handleGenderChange(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={queryParams.date_of_birth || ""}
                        onChange={(e) => handleDateOfBirthChange(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Số lượng / trang
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={queryParams.take || 10}
                        onChange={(e) => handleTakeChange(Number(e.target.value))}
                    >
                        <option value={10}>10 / trang</option>
                        <option value={20}>20 / trang</option>
                        <option value={50}>50 / trang</option>
                    </select>
                </div>
            </div>

   
           


        </div>
    );
}
