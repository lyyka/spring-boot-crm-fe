import Network from "../router/Network";
import routes from "../router/routes";
import PipelineStoreRequest from "./requests/PipelineStoreRequest";
import type PipelineStoreResponse from "./responses/PipelineStoreResponse";
import type PipelineIndexResponse from "./responses/PipelineIndexResponse";
import type GenericResponse from "../router/GenericResponse";
import type Pipeline from "./dto/Pipeline";
import type PipelineGetResponse from "./responses/PipelineGetResponse";

export default class Pipelines {
    public async get(id: number): Promise<PipelineGetResponse> {
        const data = await (new Network).handle(routes.pipelines.get(id));
        const cast = data as PipelineGetResponse;
        return cast;
    }

    public async index(): Promise<PipelineIndexResponse> {
        const data = await (new Network).handle(routes.pipelines.index());
        const cast = data as PipelineIndexResponse;
        return cast;
    }

    public async store(name: string): Promise<PipelineStoreResponse> {
        const data = await (new Network)
            .setData(
                new PipelineStoreRequest(name)
            )
            .handle(routes.pipelines.store());

        const cast = data as PipelineStoreResponse;
        return Promise.resolve(cast);
    }

    public async update(id: number, name: string): Promise<PipelineStoreResponse> {
        const data = await (new Network)
            .setData(
                new PipelineStoreRequest(name)
            )
            .handle(routes.pipelines.update(id));

        const cast = data as PipelineStoreResponse;
        return Promise.resolve(cast);
    }

    public async delete(id: number): Promise<GenericResponse> {
        const data = await (new Network)
            .handle(routes.pipelines.delete(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }
}