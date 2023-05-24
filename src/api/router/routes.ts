import LoginResponse from "../auth/responses/LoginResponse"
import PipelineStoreResponse from "../pipelines/responses/PipelineStoreResponse"
import PipelineIndexResponse from "../pipelines/responses/PipelineIndexResponse"
import GenericResponse from "./GenericResponse"
import ApiRoute from "./ApiRoute"
import PipelineGetResponse from "../pipelines/responses/PipelineGetResponse"

/**
 * This file defines back-end API routes to be used by the Network object
 */

export default {
    auth: {
        login: () => (new ApiRoute("/api/auth/login", "post", new LoginResponse)).noAuth()
    },

    pipelines: {
        index: () => (new ApiRoute("/api/pipelines", "get", new PipelineIndexResponse)),
        store: () => (new ApiRoute("/api/pipelines", "post", new PipelineStoreResponse)),
        update: (id: number) => (new ApiRoute("/api/pipelines/{id}", "put", new PipelineStoreResponse)).param('id', id),
        delete: (id: number) => (new ApiRoute("/api/pipelines/{id}", "delete", new GenericResponse)).param('id', id),
        get: (id: number) => (new ApiRoute("/api/pipelines/{id}", "get", new PipelineGetResponse)).param('id', id),
    }
}