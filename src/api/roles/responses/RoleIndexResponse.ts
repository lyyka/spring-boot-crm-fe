import type ApiResponse from "@/api/router/ApiResponse";
import Role from "@/api/roles/dto/Role";

export default class RoleIndexResponse implements ApiResponse {
    private data: Role[] = [];

    public getData(): Role[] {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data.map((e: any) => new Role(e));
    }
}