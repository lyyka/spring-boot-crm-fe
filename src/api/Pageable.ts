interface ISort {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean,
}

export type Pageable = {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: ISort;

    first: boolean;
    last: boolean;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
}