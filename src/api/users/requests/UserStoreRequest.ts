import type ApiRequest from "@/api/router/ApiRequest";

export default class UserStoreRequest implements ApiRequest {
    public firstName: string | null = null;
    public lastName: string | null = null;
    public email: string | null = null;
    public roleId: number | null = null;

    isValid(): boolean {
        return this.firstName !== null && this.lastName !== null && this.email !== null && this.roleId !== null;
    }

    getData(): Object {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            roleId: this.roleId,
        };
    }
}