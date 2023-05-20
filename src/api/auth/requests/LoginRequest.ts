import type ApiRequst from "@/api/router/ApiRequest";

export default class LoginRequest implements ApiRequst {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public getData(): Object {
        return {
            email: this.email,
            password: this.password
        }
    }
}