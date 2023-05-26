import type { Pageable } from "../Pageable";
import type ApiResponse from "./ApiResponse";

export default abstract class PagedResponse implements ApiResponse {
    private pageable: Pageable | null = null;

    abstract loadPage(items: Array<any>): void;

    getPageable() {
        return this.pageable;
    }

    setData(data: any): void {
        this.pageable = {
            ...data.data.pageable,
            first: data.data.first,
            last: data.data.last,
            numberOfElements: data.data.numberOfElements,
            totalElements: data.data.totalElements,
            totalPages: data.data.totalPages,
        };
        this.loadPage(data.data.content);
    }
}