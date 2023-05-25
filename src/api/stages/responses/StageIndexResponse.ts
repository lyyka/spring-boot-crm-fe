import type ApiResponse from "@/api/router/ApiResponse";
import Stage from "@/api/stages/dto/Stage";

export default class StageIndexResponse implements ApiResponse {
    private data: Stage[] = [];

    public getData(): Stage[] {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data.map((e: any) => new Stage(e));
    }
}