import Pipeline from "@/api/pipelines/dto/Pipeline";
import PagedResponse from "@/api/router/PagedResponse";

export default class PipelineIndexResponse extends PagedResponse {
    private data: Pipeline[] = [];

    loadPage(items: any[]): void {
        this.data = items.map((e: any) => new Pipeline(e));
    }

    public getData(): Pipeline[] {
        return this.data;
    }
}