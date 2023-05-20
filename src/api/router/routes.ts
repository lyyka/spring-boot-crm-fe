import LoginResponse from "../auth/responses/LoginResponse"
import PipelineStoreResponse from "../pipelines/responses/PipelineStoreResponse"
import ApiRoute from "./ApiRoute"

/**
 * This file defines back-end API routes to be used by the network object
 */

export default {
    auth: {
        login: () => (new ApiRoute("/api/auth/login", "post", new LoginResponse)).noAuth()
    },

    pipelines: {
        store: () => (new ApiRoute("/api/pipelines", "post", new PipelineStoreResponse))
    }
}