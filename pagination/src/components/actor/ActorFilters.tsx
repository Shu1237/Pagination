import type { ActorQueryType } from "@/utils/type";
import { useDebouncedParams } from "@/hook/useDebounce";

interface ActorFiltersProps {
    queryParams: ActorQueryType;
    onParamsChange: (params: Partial<ActorQueryType>) => void;
}

export default function ActorFilters({ queryParams, onParamsChange }: ActorFiltersProps) {
    const { localParams, updateLocalParam, setLocalParams } = useDebouncedParams(
        queryParams,
        2000,
        onParamsChange
    );

    const hasActiveFilters = !!(
        queryParams.search ||
        queryParams.name ||
        queryParams.stage_name ||
        queryParams.gender ||
        queryParams.nationality ||
        queryParams.date_of_birth
    );

    const handleClearFilters = () => {
        setLocalParams({
            ...localParams,
            search: undefined,
            name: undefined,
            stage_name: undefined,
            gender: undefined,
            nationality: undefined,
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
                        value={localParams.search || ""}
                        onChange={(e) => updateLocalParam("search", e.target.value)}
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

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4 bg-card rounded-lg border">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Tên thật
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tên thật..."
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={localParams.name || ""}
                        onChange={(e) => updateLocalParam("name", e.target.value)}
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
                        value={localParams.stage_name || ""}
                        onChange={(e) => updateLocalParam("stage_name", e.target.value)}
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
                        value={localParams.nationality || ""}
                        onChange={(e) => updateLocalParam("nationality", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Giới tính
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={localParams.gender || ""}
                        onChange={(e) => updateLocalParam("gender", e.target.value)}
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
                        value={localParams.date_of_birth || ""}
                        onChange={(e) => updateLocalParam("date_of_birth", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Số lượng / trang
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={localParams.take || 10}
                        onChange={(e) => updateLocalParam("take", Number(e.target.value))}
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
