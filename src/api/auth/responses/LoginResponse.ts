import type ApiResponse from "@/api/router/ApiResponse";

export default class LoginResponse implements ApiResponse {
    private response: { token: string, plainUsername: string, encryptedUsername: string } | undefined;

    public getToken() {
        return this.response?.token;
    }

    public getPlainUsername() {
        return this.response?.plainUsername;
    }

    public getEncryptedUsername() {
        return this.response?.encryptedUsername;
    }

    public setData(data: any): void {
        this.response = data.data;
    }
}