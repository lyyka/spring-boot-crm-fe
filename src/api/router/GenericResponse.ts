import type ApiResponse from "./ApiResponse";

export default class GenericResponse implements ApiResponse {
    private data: Object = {};

    public getData(): Object {
        return this.data;
    }

    public setData(data: any) {
        this.data = data;
    }
}