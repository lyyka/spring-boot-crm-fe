import Role from "@/api/roles/dto/Role";

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean,
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

    public getFullName(): string {
        return this.getFirstName() + " " + this.getLastName();
    }

    public getFirstName(): string {
        return this.data.firstName;
    }

    public getLastName(): string {
        return this.data.lastName;
    }

    public getEmail(): string {
        return this.data.email;
    }

    public getEnabled(): boolean {
        return this.data.enabled;
    }

    public getRoleId(): number {
        return this.data.role.getId();
    }

    public getRoleName(): string {
        return this.data.role.getName();
    }
}