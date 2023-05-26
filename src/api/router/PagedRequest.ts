import type { Pageable } from "../Pageable";

export default class PagedRequest {
    public page: number;
    public perPage: number;

    // Defaults are defined here
    constructor(pageable: Pageable | null) {
        this.page = pageable?.pageNumber || 0;
        this.perPage = pageable?.pageSize || 10;
    }
}