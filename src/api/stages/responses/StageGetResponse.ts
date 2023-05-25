import type ApiResponse from "@/api/router/ApiResponse";
import Stage from "@/api/stages/dto/Stage";

export default class StageGetResponse implements ApiResponse {
    private data: Stage | null = null;

    public getStage() {
        return this.data;
    }

    setData(data: any): void {
        this.data = new Stage(data.data);
    }
}