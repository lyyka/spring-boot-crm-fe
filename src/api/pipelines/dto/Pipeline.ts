interface IPipeline {
    id: number;
    name: string;
}

export default class Pipeline {
    public data: IPipeline;

    constructor(data: any) {
        this.data = data;
    }

    public getId(): number {
        return this.data.id;
    }

    public getName(): string {
        return this.data.name;
    }
}