import type ApiResponse from "./ApiResponse";
import type { HttpMethod } from "./Network";
import type PagedRequest from "./PagedRequest";

/**
 * This class is responsible for carrying over information about
 * the specific api endpoint, such as route, http method, ...
 */
export default class ApiRoute {
    private route: string;
    private method: HttpMethod;
    private expectedResponse: ApiResponse;
    private base = 'http://localhost:8080';
    private auth = true;
    private params: { [key: string]: number | string } = {}

    constructor(route: string, method: HttpMethod, expectedResponse: ApiResponse) {
        this.route = route;
        this.method = method;
        this.expectedResponse = expectedResponse;
    }

    public param(key: string, value: number | string): ApiRoute {
        this.params[key] = value;
        return this;
    }

    public noAuth(): ApiRoute {
        this.auth = false;
        return this;
    }

    public isAuth(): boolean {
        return this.auth;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getExpectedResponse() {
        return this.expectedResponse;
    }

    public render(): string {
        let routeClean = this.route;

        Object.keys(this.params).forEach(k => {
            routeClean = routeClean.replace(`{${k}}`, this.params[k].toString())
        });

        return `${this.base}${routeClean}`;
    }
}