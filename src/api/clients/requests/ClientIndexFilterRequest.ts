import type ApiRequest from "@/api/router/ApiRequest";

export default class ClientIndexFilterRequest implements ApiRequest {
    public createdAtRange: any = [];
    public search: string | null = null;

    getData(): Object {
        return {
            search: this.search,
            createdAtFrom: this.createdAtRange[0] || null,
            createdAtTo: this.createdAtRange[1] || null
        }
    }
}