import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import type GenericResponse from "../router/GenericResponse";
import type DealsForClientResponse from "./responses/DealsForClientResponse";
import type DealStoreRequest from "./requests/DealStoreRequest";

export default class Deals {
    // public async index(request: PagedRequest): Promise<ClientIndexResponse> {
    //     const data = await (new Network).handle(routes.clients.index(request));
    //     const cast = data as ClientIndexResponse;
    //     return cast;
    // }

    public async getForClient(clientId: number): Promise<DealsForClientResponse> {
        const data = await (new Network).handle(routes.deals.getForClient(clientId));
        const cast = data as DealsForClientResponse;
        return cast;
    }

    public async store(request: DealStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.deals.store());

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    // public async update(id: number, request: ClientStoreRequest): Promise<GenericResponse> {
    //     const data = await (new Network)
    //         .setData(request)
    //         .handle(routes.clients.update(id));

    //     const cast = data as GenericResponse;
    //     return Promise.resolve(cast);
    // }

    public async delete(id: number): Promise<GenericResponse> {
        const data = await (new Network)
            .handle(routes.deals.delete(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }
}