import DateHandle from "@/api/DateHandle";
import { digitsOnly } from "@/api/Utils";

interface IClient {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    createdAt: string,
}

export default class Client {
    public data: IClient;

    constructor(data: any) {
        this.data = data;
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

    public getPhone(): string {
        return this.data.phone;
    }

    public getPhoneNumbersOnly(): string {
        return digitsOnly(this.getPhone());
    }

    public getCreatedAt(): DateHandle {
        return new DateHandle(this.data.createdAt);
    }
}