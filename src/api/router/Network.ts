import axios from "axios";
import type ApiRoute from "./ApiRoute";
import type ApiResponse from "./ApiResponse";
import type ApiRequst from "./ApiRequest";

/**
 * This class is responsible for making http requests
 * and mapping the response to provided classes
 */
export default class Network {
    private data: Object = {};

    public setData(request: ApiRequst): Network {
        this.data = request.getData();
        return this;
    }

    public handle(route: ApiRoute, mapResponseTo: ApiResponse, callback: CallableFunction): void {
        axios({
            method: route.geteMethod(),
            url: route.render(),
            data: this.data,
        }).then(response => {
            mapResponseTo.setData(response.data);
            callback(mapResponseTo)
        })
    }
}