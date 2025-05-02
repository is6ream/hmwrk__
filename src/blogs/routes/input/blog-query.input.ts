import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting";
import { BlogSortField } from "./blog-sort.filed";

export type BlogQueryInput = PaginationAndSorting<BlogSortField> & 
Partial<{
    searchBlogNameTerm: string,
}>