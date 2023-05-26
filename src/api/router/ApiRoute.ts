import type ApiResponse from "./ApiResponse";
import type PagedRequest from "./PagedRequest";

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
    private params: { [key: string]: number | string } = {}
    private pagedRequest: PagedRequest | null = null;

    constructor(route: string, method: string, expectedResponse: ApiResponse) {
        this.route = route;
        this.method = method;
        this.expectedResponse = expectedResponse;
    }

    public paged(pagedRequest: PagedRequest): ApiRoute {
        this.pagedRequest = pagedRequest;
        return this;
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

    public getMethod(): string {
        return this.method;
    }

    public getExpectedResponse() {
        return this.expectedResponse;
    }

    public objectToQuery(object: { [key: string]: string | number }): string {
        let result: Array<string> = [];
        Object.keys(object).forEach(paramName => {
            result.push(`${paramName}=${object[paramName]}`);
        })
        let queryString = result.join("&");

        if (queryString.length > 0) {
            queryString = "?" + queryString;
        }

        return queryString;
    }

    public render(): string {
        let routeClean = this.route;

        Object.keys(this.params).forEach(k => {
            routeClean = routeClean.replace(`{${k}}`, this.params[k].toString())
        });

        const queryParams: { page?: number, perPage?: number } = {};
        if (this.pagedRequest) {
            queryParams.page = this.pagedRequest.page;
            queryParams.perPage = this.pagedRequest.perPage;
        }
        const query = this.objectToQuery(queryParams);

        return `${this.base}${routeClean}${query}`;
    }
}