import type UserIndexResponse from "./responses/UserIndexResponse";
import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import type GenericResponse from "../router/GenericResponse";
import type UserStoreRequest from "./requests/UserStoreRequest";
import type UserGetResponse from "./responses/UserGetResponse";
import type PagedRequest from "../router/PagedRequest";

export default class Users {
    public async index(request: PagedRequest): Promise<UserIndexResponse> {
        const data = await (new Network).handle(routes.users.index(request));
        const cast = data as UserIndexResponse;
        return cast;
    }

    public async get(id: number): Promise<UserGetResponse> {
        const data = await (new Network).handle(routes.users.get(id));
        const cast = data as UserGetResponse;
        return cast;
    }

    public async store(request: UserStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.users.store());

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async update(id: number, request: UserStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.users.update(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async delete(id: number): Promise<GenericResponse> {
        const data = await (new Network)
            .handle(routes.users.delete(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }
}