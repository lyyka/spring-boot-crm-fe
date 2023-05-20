import Network from "../router/Network";
import routes from "../router/routes";
import PipelineStoreRequest from "./requests/PipelineStoreRequest";
import type PipelineStoreResponse from "./responses/PipelineStoreResponse";

export default class Pipelines {
    public async store(name: string): Promise<PipelineStoreResponse> {
        const data = await (new Network)
            .setData(
                new PipelineStoreRequest(name)
            )
            .handle(routes.pipelines.store());

        const cast = data as PipelineStoreResponse;
        return Promise.resolve(cast);
    }
}