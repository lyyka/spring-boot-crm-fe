import type ApiResponse from "@/api/router/ApiResponse";
import Pipeline from "../dto/Pipeline";

export default class PipelineStoreResponse implements ApiResponse {
    private data: Pipeline[] = [];

    public getData(): Pipeline[] {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data.map((e: any) => new Pipeline(e));
    }
}