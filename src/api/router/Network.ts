import axios from "axios";
import type ApiRoute from "./ApiRoute";
import type ApiRequest from "./ApiRequest";
import type ApiResponse from "./ApiResponse";

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

/**
 * This class is responsible for making http requests
 * and mapping the response to provided classes
 */
export default class Network {
    private data: Object = {};

    public setData(request: ApiRequest): Network {
        this.data = {
            ...this.data,
            ...request.getData()
        };
        return this;
    }

    public applyRequests(requests: ApiRequest[]): Network {
        requests.forEach(request => this.setData(request));
        return this;
    }

    public async handle(route: ApiRoute): Promise<ApiResponse> {
        const request = {
            method: route.getMethod(),
            url: route.render(),
            params: {},
            data: {},
            headers: {}
        };

        if ([HttpMethod.GET, HttpMethod.DELETE].includes(route.getMethod())) {
            request.params = this.data;
        } else if ([HttpMethod.POST, HttpMethod.PUT].includes(route.getMethod())) {
            request.data = this.data;
        }

        if (route.isAuth()) {
            request.headers = {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            }
        }

        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios(request);
                const data = route.getExpectedResponse();
                data.setData(response);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}