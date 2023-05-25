import type ApiResponse from "@/api/router/ApiResponse";
import Pipeline from "@/api/pipelines/dto/Pipeline";

export default class PipelineIndexResponse implements ApiResponse {
    private data: Pipeline[] = [];

    public getData(): Pipeline[] {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data.map((e: any) => new Pipeline(e));
    }
}