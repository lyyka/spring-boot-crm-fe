import type RoleIndexResponse from "./responses/RoleIndexResponse";
import Network from "@/api/router/Network";
import routes from "@/api/router/routes";

export default class Roles {
    public async index(): Promise<RoleIndexResponse> {
        const data = await (new Network).handle(routes.roles.index());
        const cast = data as RoleIndexResponse;
        return cast;
    }
}