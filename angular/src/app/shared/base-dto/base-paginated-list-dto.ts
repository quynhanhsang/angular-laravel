export class PaginatedListDto<TData> {
    pageIndex: number;
    pageSize: number;
    itemsCount: number;
    pagesCount: number;
    items: TData [];
}

export const PageSize = [10, 25, 50, 100, 200];