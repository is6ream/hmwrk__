import { SortDirection } from "mongodb";

export type PaginationAndSorting<S> = {
    pageNumber: number,
    pageSize: number,
    sortBy: S,
    SortDirection: SortDirection
}