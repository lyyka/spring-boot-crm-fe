import type ApiRequest from "@/api/router/ApiRequest";

export default class StageStoreRequest implements ApiRequest {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getData(): Object {
        return {
            name: this.name,
        };
    }
}