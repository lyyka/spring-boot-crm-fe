import type ApiResponse from "@/api/router/ApiResponse";
import Pipeline from "@/api/pipelines/dto/Pipeline";

export default class PipelineGetResponse implements ApiResponse {
    private data: Pipeline | null = null;

    public getPipeline() {
        return this.data;
    }

    setData(data: any): void {
        this.data = new Pipeline(data.data);
    }
}