import Client from "@/api/clients/dto/Client";
import PagedResponse from "@/api/router/PagedResponse";

export default class ClientIndexResponse extends PagedResponse {
    private data: Client[] = [];

    public getData(): Client[] {
        return this.data;
    }

    loadPage(items: any[]): void {
        this.data = items.map((e: any) => new Client(e));
    }
}