/**
 * This class is responsible for carrying over information about
 * the specific api endpoint, such as route, http method, ...
 */
export default class ApiRoute {
    private route: string;
    private method: string;
    private base = 'http://localhost:8080';

    constructor(route: string, method: string) {
        this.route = route;
        this.method = method;
    }

    public geteMethod(): string {
        return this.method;
    }

    public render(): string {
        return `${this.base}${this.route}`;
    }
}