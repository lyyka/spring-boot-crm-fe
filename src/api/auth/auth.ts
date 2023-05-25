import routes from "@/api/router/routes";
import LoginResponse from "./responses/LoginResponse";
import Network from "@/api/router/Network";
import LoginRequest from "./requests/LoginRequest";

export default class Auth {
    public async login(email: string, password: string): Promise<boolean> {
        try {
            const data = await (new Network)
                .setData(new LoginRequest(email, password))
                .handle(routes.auth.login());

            const cast = data as LoginResponse;

            const token = cast.getToken();

            if (token) {
                localStorage.setItem('access_token', token)
                return Promise.resolve(true);
            }

            return Promise.resolve(false);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public logout(): void {
        localStorage.removeItem('access_token');
    }

    public static isAuthenticated(): boolean {
        return localStorage.getItem('access_token') !== null;
    }
}