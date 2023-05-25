interface IRole {
    id: number;
    name: string;
}

export default class Role {
    private data: IRole;

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