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
            const plainUsername = cast.getPlainUsername();
            const encryptedUsername = cast.getEncryptedUsername();
            const authoritiesList = cast.getAuthorities();

            if (token && plainUsername && encryptedUsername && authoritiesList) {
                localStorage.setItem('access_token', token)
                localStorage.setItem('plain_username', plainUsername)
                localStorage.setItem('encrypted_username', encryptedUsername)
                localStorage.setItem('authorities', JSON.stringify(authoritiesList))
                return Promise.resolve(true);
            }

            return Promise.resolve(false);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public getAuthorities(): string[] {
        const authorities = localStorage.getItem('authorities');
        if (!authorities) {
            return [];
        }

        return Array.from(JSON.parse(authorities));
    }

    public hasAnyAuthority(authoritiesToCheck: string[]): boolean {
        const authoritiesList = this.getAuthorities();
        let result = false;

        for (let i = 0; i < authoritiesToCheck.length && !result; i++) {
            result = authoritiesList.includes(authoritiesToCheck[i]);
        }

        return result;
    }

    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('plain_username');
        localStorage.removeItem('encrypted_username');
    }

    public static isAuthenticated(): boolean {
        return localStorage.getItem('access_token') !== null &&
            localStorage.getItem('plain_username') !== null &&
            localStorage.getItem('encrypted_username') !== null;
    }

    public static getPlainUsername(): string | null {
        return localStorage.getItem('plain_username');
    }

    public static getEncryptedUsername(): string | null {
        return localStorage.getItem('encrypted_username');
    }
}