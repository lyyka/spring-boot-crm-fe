import PagedResponse from "@/api/router/PagedResponse";
import User from "@/api/users/dto/User";

export default class UserIndexResponse extends PagedResponse {
    private data: User[] = [];

    public getData(): User[] {
        return this.data;
    }

    loadPage(items: any[]): void {
        this.data = items.map((e: any) => new User(e));
    }
}