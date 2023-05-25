import Network from "@/api/router/Network";
import routes from "@/api/router/routes";
import PipelineStoreRequest from "./requests/PipelineStoreRequest";
import type PipelineIndexResponse from "./responses/PipelineIndexResponse";
import type GenericResponse from "@/api/router/GenericResponse";
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

    public async store(name: string): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(
                new PipelineStoreRequest(name)
            )
            .handle(routes.pipelines.store());

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async update(id: number, name: string): Promise<GenericResponse> {
        const data = await (new Network)
            .setData(
                new PipelineStoreRequest(name)
            )
            .handle(routes.pipelines.update(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }

    public async delete(id: number): Promise<GenericResponse> {
        const data = await (new Network)
            .handle(routes.pipelines.delete(id));

        const cast = data as GenericResponse;
        return Promise.resolve(cast);
    }
}