import Role from "@/api/roles/dto/Role";

interface IUser {
    id: number;
    email: string;
    role: Role;
}

export default class User {
    public data: IUser;

    constructor(data: any) {
        this.data = data;
        this.data.role = new Role(this.data.role);
    }

    public getId(): number {
        return this.data.id;
    }

    public getEmail(): string {
        return this.data.email;
    }

    public getRoleName(): string {
        return this.data.role.getName();
    }
}