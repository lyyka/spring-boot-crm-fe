import LoginResponse from "@/api/auth/responses/LoginResponse"
import PipelineIndexResponse from "@/api/pipelines/responses/PipelineIndexResponse"
import GenericResponse from "./GenericResponse"
import ApiRoute from "./ApiRoute"
import PipelineGetResponse from "@/api/pipelines/responses/PipelineGetResponse"
import StageIndexResponse from "@/api/stages/responses/StageIndexResponse"
import StageGetResponse from "@/api/stages/responses/StageGetResponse"

/**
 * This file defines back-end API routes to be used by the Network object
 */

export default {
    auth: {
        login: () => (new ApiRoute("/api/auth/login", "post", new LoginResponse)).noAuth()
    },

    pipelines: {
        index: () => (new ApiRoute("/api/pipelines", "get", new PipelineIndexResponse)),
        store: () => (new ApiRoute("/api/pipelines", "post", new GenericResponse)),
        update: (id: number) => (new ApiRoute("/api/pipelines/{id}", "put", new GenericResponse)).param('id', id),
        delete: (id: number) => (new ApiRoute("/api/pipelines/{id}", "delete", new GenericResponse)).param('id', id),
        get: (id: number) => (new ApiRoute("/api/pipelines/{id}", "get", new PipelineGetResponse)).param('id', id),
    },

    stages: {
        index: (pipelineId: number) => (new ApiRoute("/api/stages/{pipeline_id}", "get", new StageIndexResponse).param("pipeline_id", pipelineId)),
        get: (id: number) => (new ApiRoute("/api/stages/get/{id}", "get", new StageGetResponse).param("id", id)),
        update: (id: number) => (new ApiRoute("/api/stages/{id}", "put", new GenericResponse)).param('id', id),
        delete: (id: number) => (new ApiRoute("/api/stages/{id}", "delete", new GenericResponse)).param('id', id),
    }
}