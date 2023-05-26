import type ClientIndexResponse from "./responses/ClientIndexResponse";
import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import type GenericResponse from "../router/GenericResponse";
import type ClientGetResponse from "./responses/ClientGetResponse";
import type ClientStoreRequest from "./requests/ClientStoreRequest";
import type PagedRequest from "../router/PagedRequest";

export default class Clients {
    public async index(request: PagedRequest): Promise<ClientIndexResponse> {
        const data = await (new Network).handle(routes.clients.index(request));
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