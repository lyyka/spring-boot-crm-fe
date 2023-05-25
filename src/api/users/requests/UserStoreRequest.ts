import type ApiRequest from "@/api/router/ApiRequest";
import User from "@/api/users/dto/User";

export default class UserStoreRequest implements ApiRequest {
    public firstName: string | null = null;
    public lastName: string | null = null;
    public email: string | null = null;
    public roleId: number | null = null;
    public enabled: boolean = false;

    isValid(): boolean {
        return this.firstName !== null && this.lastName !== null && this.email !== null && this.roleId !== null;
    }

    fromEntity(user: User) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.roleId = user.getRoleId();
        this.enabled = user.getEnabled();
    }

    getData(): Object {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            roleId: this.roleId,
            enabled: this.enabled,
        };
    }
}