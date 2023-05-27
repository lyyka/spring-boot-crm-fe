import Pipeline from "@/api/pipelines/dto/Pipeline";
import type ApiResponse from "@/api/router/ApiResponse";

export default class PipelineAllResponse implements ApiResponse {
    private data: Pipeline[] = [];

    setData(data: any): void {
        this.data = data.data.map((e: any) => new Pipeline(e));
    }

    public getData(): Pipeline[] {
        return this.data;
    }
}