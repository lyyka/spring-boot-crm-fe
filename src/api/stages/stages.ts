import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import type GenericResponse from "@/api/router/GenericResponse";
import type StageIndexResponse from "./responses/StageIndexResponse";
import type StageGetResponse from "./responses/StageGetResponse";
import StageStoreRequest from "./requests/StageStoreRequest";

export default class Stages {
    public async index(pipelineId: number): Promise<StageIndexResponse> {
        const data = await (new Network).handle(routes.stages.index(pipelineId));
        const cast = data as StageIndexResponse;
        return cast;
    }

    public async get(id: number): Promise<StageGetResponse> {
        const data = await (new Network).handle(routes.stages.get(id));
        const cast = data as StageGetResponse;
        return cast;
    }

    // public async store(name: string): Promise<PipelineStoreResponse> {
    //     const data = await (new Network)
    //         .setData(
    //             new PipelineStoreRequest(name)
    //         )
    //         .handle(routes.pipelines.store());

    //     const cast = data as PipelineStoreResponse;
    //     return Promise.resolve(cast);
    // }

    public async update(id: number, name: string): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(
                new StageStoreRequest(name)
            )
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