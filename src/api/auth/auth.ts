import routes from "@/api/router/routes";
import LoginResponse from "./responses/LoginResponse";
import Network from "../router/Network";
import LoginRequest from "./requests/LoginRequest";

export default class Auth {
    public login(email: string, password: string): void {
        (new Network)
            .setData(new LoginRequest(email, password))
            .handle(
                routes.auth.login(),
                (data: LoginResponse) => {
                    console.log(data.getToken())
                }
            );
    }
}