export interface IFilter {
    filter: string | null;
    color: string | null;
    sortColumn: string | null;
    sortBy: number | null;
    sizes: string[];
    minPrice: number | null;
    maxPrice: number | null;
    isAvaliable: true | null;
}

export interface IFilterPayload {
    pageNumber: number;
    filters: IFilter;
}
