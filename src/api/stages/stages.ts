import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import type GenericResponse from "@/api/router/GenericResponse";
import type StageIndexResponse from "./responses/StageIndexResponse";
import type StageGetResponse from "./responses/StageGetResponse";
import StageStoreRequest from "./requests/StageStoreRequest";
import type StageDataPerPipelineResponse from "./responses/StageDataPerPipelineResponse";

export default class Stages {
    public async index(pipelineId: number): Promise<StageIndexResponse> {
        const data = await (new Network).handle(routes.stages.index(pipelineId));
        const cast = data as StageIndexResponse;
        return cast;
    }

    public async getIdsPerPipeline(): Promise<StageDataPerPipelineResponse> {
        const data = await (new Network).handle(routes.stages.getIdsPerPipeline());
        const cast = data as StageDataPerPipelineResponse;
        return cast;
    }

    public async get(id: number): Promise<StageGetResponse> {
        const data = await (new Network).handle(routes.stages.get(id));
        const cast = data as StageGetResponse;
        return cast;
    }

    public async store(request: StageStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.stages.store());

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async updateOrder(id: number, order: number): Promise<GenericResponse> {
        const data = await (new Network)
            .setRawData({ order })
            .handle(routes.stages.updateOrder(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async update(id: number, request: StageStoreRequest): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(request)
            .handle(routes.stages.update(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async delete(id: number): Promise<GenericResponse> {
        const data = await (new Network)
            .handle(routes.stages.delete(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }
}