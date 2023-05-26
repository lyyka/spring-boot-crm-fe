import type ApiResponse from "@/api/router/ApiResponse";
import Deal from "../dto/Deal";

export default class DealsForClientResponse implements ApiResponse {
    private data: Deal[] = [];

    public getData(): Deal[] {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data.map((e: any) => new Deal(e));
    }
}