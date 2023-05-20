import type ApiResponse from "@/api/router/ApiResponse";

export default class LoginResponse implements ApiResponse {
    private response: { token: string; } | undefined;

    public getToken(): string | undefined {
        return this.response?.token;
    }

    public setData(data: { token: string }): void {
        this.response = data;
    }
}