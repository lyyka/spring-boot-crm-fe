import type ApiResponse from "@/api/router/ApiResponse";
import User from "@/api/users/dto/User";

export default class UserGetResponse implements ApiResponse {
    private data: User | null = null;

    public getData() {
        return this.data;
    }

    setData(data: any): void {
        this.data = new User(data.data);
    }
}