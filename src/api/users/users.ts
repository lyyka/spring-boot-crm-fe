import type UserIndexResponse from "./responses/UserIndexResponse";
import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import type GenericResponse from "../router/GenericResponse";
import type UserStoreRequest from "./requests/UserStoreRequest";

export default class Users {
    public async index(): Promise<UserIndexResponse> {
        const data = await (new Network).handle(routes.users.index());
        const cast = data as UserIndexResponse;
        return cast;
    }

    public async store(request: UserStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.users.store());

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