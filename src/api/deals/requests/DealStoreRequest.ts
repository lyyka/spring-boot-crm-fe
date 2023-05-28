import type ApiRequest from "@/api/router/ApiRequest";
import { IDealStatus } from "@/api/deals/dto/IDealStatus";

export default class DealStoreRequest implements ApiRequest {
    public clientId: number | null = null;
    public stageId: string | null = null;
    public name: string | null = null;
    public dealStatus: IDealStatus | null = null;

    getData(): Object {
        return {
            clientId: this.clientId,
            stageId: this.stageId,
            name: this.name,
            dealStatus: this.dealStatus,
        };
    }
}