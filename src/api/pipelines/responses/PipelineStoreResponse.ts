import type ApiResponse from "@/api/router/ApiResponse";

export default class PipelineStoreResponse implements ApiResponse {
    private data: Object = {};

    setData(data: Object): void {
        this.data = data;
    }
}