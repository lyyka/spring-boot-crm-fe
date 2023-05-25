import type ApiResponse from "@/api/router/ApiResponse";
import User from "@/api/users/dto/User";

export default class UserIndexResponse implements ApiResponse {
    private data: User[] = [];

    public getData(): User[] {
        return this.data;
    }

    setData(data: any): void {
        this.data = data.data.map((e: any) => new User(e));
    }
}