import type ApiRequest from "@/api/router/ApiRequest";
import Client from "@/api/clients/dto/Client";

export default class ClientStoreRequest implements ApiRequest {
    public firstName: string | null = null;
    public lastName: string | null = null;
    public email: string | null = null;
    public phoneNumber: string | null = null;

    isValid(): boolean {
        return this.firstName !== null && this.lastName !== null && this.email !== null && this.phoneNumber !== null;
    }

    fromEntity(client: Client) {
        this.firstName = client.getFirstName();
        this.lastName = client.getLastName();
        this.email = client.getEmail();
        this.phoneNumber = client.getPhone();
    }

    getData(): Object {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
        };
    }
}