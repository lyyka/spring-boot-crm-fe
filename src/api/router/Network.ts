import axios from "axios";
import type ApiRoute from "./ApiRoute";
import type ApiRequest from "./ApiRequest";
import type ApiResponse from "./ApiResponse";

/**
 * This class is responsible for making http requests
 * and mapping the response to provided classes
 */
export default class Network {
    private data: Object = {};

    public setData(request: ApiRequest): Network {
        this.data = request.getData();
        return this;
    }

    public async handle(route: ApiRoute): Promise<ApiResponse> {
        const request = {
            method: route.getMethod(),
            url: route.render(),
            data: this.data,
            headers: {
            }
        };

        if (route.isAuth()) {
            request.headers = {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            }
        }

        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios(request);
                const data = route.getExpectedResponse();
                data.setData(response.data);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}