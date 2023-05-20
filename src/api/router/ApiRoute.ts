import type ApiResponse from "./ApiResponse";

/**
 * This class is responsible for carrying over information about
 * the specific api endpoint, such as route, http method, ...
 */
export default class ApiRoute {
    private route: string;
    private method: string;
    private expectedResponse: ApiResponse;
    private base = 'http://localhost:8080';
    private auth = true;

    constructor(route: string, method: string, expectedResponse: ApiResponse) {
        this.route = route;
        this.method = method;
        this.expectedResponse = expectedResponse;
    }

    public noAuth(): ApiRoute {
        this.auth = false;
        return this;
    }

    public isAuth(): boolean {
        return this.auth;
    }

    public getMethod(): string {
        return this.method;
    }

    public getExpectedResponse() {
        return this.expectedResponse;
    }

    public render(): string {
        return `${this.base}${this.route}`;
    }
}