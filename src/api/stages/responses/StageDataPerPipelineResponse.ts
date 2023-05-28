import type ApiResponse from "@/api/router/ApiResponse";

export default class StageDataPerPipelineResponse implements ApiResponse {
    private data: { [key: number]: { id: number, name: string }[] } = {};

    public getData(): { [key: number]: { id: number, name: string }[] } {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data;
    }
}