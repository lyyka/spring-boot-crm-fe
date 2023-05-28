import LoginResponse from "@/api/auth/responses/LoginResponse"
import PipelineIndexResponse from "@/api/pipelines/responses/PipelineIndexResponse"
import GenericResponse from "./GenericResponse"
import ApiRoute from "./ApiRoute"
import PipelineGetResponse from "@/api/pipelines/responses/PipelineGetResponse"
import StageIndexResponse from "@/api/stages/responses/StageIndexResponse"
import StageGetResponse from "@/api/stages/responses/StageGetResponse"
import UserIndexResponse from "@/api/users/responses/UserIndexResponse"
import RoleIndexResponse from "../roles/responses/RoleIndexResponse"
import UserGetResponse from "../users/responses/UserGetResponse"
import ClientGetResponse from "../clients/responses/ClientGetResponse"
import ClientIndexResponse from "../clients/responses/ClientIndexResponse"
import type PagedRequest from "./PagedRequest"
import DealsForClientResponse from "../deals/responses/DealsForClientResponse"
import PipelineAllResponse from "../pipelines/responses/PipelineAllResponse"
import { HttpMethod } from "./Network"

/**
 * This file defines back-end API routes to be used by the Network object
 */

export default {
    auth: {
        login: () => (new ApiRoute("/api/auth/login", HttpMethod.POST, new LoginResponse)).noAuth()
    },

    roles: {
        index: () => (new ApiRoute("/api/roles", HttpMethod.GET, new RoleIndexResponse)),
    },

    deals: {
        getForClient: (clientId: number) => (new ApiRoute("/api/deals/for-client/{clientId}", HttpMethod.GET, new DealsForClientResponse)).param('clientId', clientId),
        store: () => (new ApiRoute("/api/deals", HttpMethod.POST, new GenericResponse)),
        delete: (id: number) => (new ApiRoute("/api/deals/{id}", HttpMethod.DELETE, new GenericResponse)).param('id', id),
    },

    pipelines: {
        all: () => (new ApiRoute("/api/pipelines/all", HttpMethod.GET, new PipelineAllResponse)),
        index: () => (new ApiRoute("/api/pipelines", HttpMethod.GET, new PipelineIndexResponse)),
        store: () => (new ApiRoute("/api/pipelines", HttpMethod.POST, new GenericResponse)),
        update: (id: number) => (new ApiRoute("/api/pipelines/{id}", HttpMethod.PUT, new GenericResponse)).param('id', id),
        delete: (id: number) => (new ApiRoute("/api/pipelines/{id}", HttpMethod.DELETE, new GenericResponse)).param('id', id),
        get: (id: number) => (new ApiRoute("/api/pipelines/{id}", HttpMethod.GET, new PipelineGetResponse)).param('id', id),
    },

    stages: {
        index: (pipelineId: number) => (new ApiRoute("/api/stages/{pipeline_id}", HttpMethod.GET, new StageIndexResponse).param("pipeline_id", pipelineId)),
        get: (id: number) => (new ApiRoute("/api/stages/get/{id}", HttpMethod.GET, new StageGetResponse).param("id", id)),
        update: (id: number) => (new ApiRoute("/api/stages/{id}", HttpMethod.PUT, new GenericResponse)).param('id', id),
        delete: (id: number) => (new ApiRoute("/api/stages/{id}", HttpMethod.DELETE, new GenericResponse)).param('id', id),
    },

    users: {
        index: () => (new ApiRoute("/api/users", HttpMethod.GET, new UserIndexResponse)),
        get: (id: number) => (new ApiRoute("/api/users/{id}", HttpMethod.GET, new UserGetResponse).param("id", id)),
        store: () => (new ApiRoute("/api/users", HttpMethod.POST, new GenericResponse)),
        update: (id: number) => (new ApiRoute("/api/users/{id}", HttpMethod.PUT, new GenericResponse)).param('id', id),
        delete: (id: number) => (new ApiRoute("/api/users/{id}", HttpMethod.DELETE, new GenericResponse)).param('id', id),
    },

    clients: {
        index: () => (new ApiRoute("/api/clients", HttpMethod.GET, new ClientIndexResponse)),
        get: (id: number) => (new ApiRoute("/api/clients/{id}", HttpMethod.GET, new ClientGetResponse).param("id", id)),
        store: () => (new ApiRoute("/api/clients", HttpMethod.POST, new GenericResponse)),
        update: (id: number) => (new ApiRoute("/api/clients/{id}", HttpMethod.PUT, new GenericResponse)).param('id', id),
        delete: (id: number) => (new ApiRoute("/api/clients/{id}", HttpMethod.DELETE, new GenericResponse)).param('id', id),
    }
}