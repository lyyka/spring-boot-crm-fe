import type ApiResponse from "@/api/router/ApiResponse";
import Client from "@/api/clients/dto/Client";

export default class ClientIndexResponse implements ApiResponse {
    private data: Client[] = [];

    public getData(): Client[] {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data.map((e: any) => new Client(e));
    }
}