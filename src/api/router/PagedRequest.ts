import type { Pageable } from "../Pageable";
import type ApiRequest from "./ApiRequest";

export default class PagedRequest implements ApiRequest {
    public page: number;
    public perPage: number;

    // Defaults are defined here
    constructor(pageable: Pageable | null) {
        this.page = pageable?.pageNumber || 0;
        this.perPage = pageable?.pageSize || 10;
    }

    getData(): Object {
        return {
            page: this.page,
            perPage: this.perPage
        };
    }
}