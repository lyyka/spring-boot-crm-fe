import type ApiResponse from "@/api/router/ApiResponse";
import Client from "@/api/clients/dto/Client";

export default class ClientGetResponse implements ApiResponse {
    private data: Client | null = null;

    public getData() {
        return this.data;
    }

    setData(data: any): void {
        this.data = new Client(data.data);
    }
}