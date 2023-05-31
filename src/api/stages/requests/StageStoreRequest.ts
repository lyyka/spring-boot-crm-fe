import type ApiRequest from "@/api/router/ApiRequest";

export default class StageStoreRequest implements ApiRequest {
    public name: string | null = null;
    public pipelineId: number | null = null;

    setName(name: string) {
        this.name = name;
        return this;
    }

    getData(): Object {
        return {
            name: this.name,
            pipelineId: this.pipelineId,
        };
    }
}