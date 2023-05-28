import type ClientIndexResponse from "./responses/ClientIndexResponse";
import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import type GenericResponse from "@/api/router/GenericResponse";
import type ClientGetResponse from "@/api/clients/responses/ClientGetResponse";
import type ClientStoreRequest from "@/api/clients/requests/ClientStoreRequest";
import type ApiRequest from "../router/ApiRequest";

export default class Clients {
    public async index(...requests: ApiRequest[]): Promise<ClientIndexResponse> {
        const data = await (new Network())
            .applyRequests(requests)
            .handle(routes.clients.index());
        const cast = data as ClientIndexResponse;
        return cast;
    }

    public async get(id: number): Promise<ClientGetResponse> {
        const data = await (new Network).handle(routes.clients.get(id));
        const cast = data as ClientGetResponse;
        return cast;
    }

    public async store(request: ClientStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.clients.store());

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async update(id: number, request: ClientStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.clients.update(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async delete(id: number): Promise<GenericResponse> {
        const data = await (new Network)
            .handle(routes.clients.delete(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }
}