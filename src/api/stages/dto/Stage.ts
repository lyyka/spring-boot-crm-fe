import Pipeline from "@/api/pipelines/dto/Pipeline";

interface IStage {
    id: number;
    name: string;
    pipeline: Pipeline | null;
}

export default class Stage {
    public data: IStage;

    constructor(data: any) {
        data.pipeline = new Pipeline(data.pipeline);
        this.data = data;
    }

    public getPipeline() {
        return this.data.pipeline;
    }

    public getId(): number {
        return this.data.id;
    }

    public getName(): string {
        return this.data.name;
    }
}