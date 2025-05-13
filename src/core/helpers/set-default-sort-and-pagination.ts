import { query } from "express-validator";
import { paginationAndSortingValidation } from "../../blogs/application/dtos/dtos/blogs.service";
import { PaginationAndSorting } from "../types/pagination-and-sorting";


export function setDefaultSortAndPaginationIfNotExists<P = string>( 
    query: Partial<PaginationAndSorting<P>>,

): PaginationAndSorting<P>{
    return {
        ...paginationAndSortingValidation,
        ...query,
        sortBy: (query.sortBy ?? paginationAndSortingValidation.sortBy) as P
    }
}



//остановился на реализации пагинации и сортинга