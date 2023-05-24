import type ApiResponse from "@/api/router/ApiResponse";

export default class PipelineStoreResponse implements ApiResponse {
    private data: Object = {};

    setData(data: any): void {
        this.data = data;
    }
}