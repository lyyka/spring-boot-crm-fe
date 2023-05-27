import DateHandle from "@/api/DateHandle";
import { IDealStatus } from "./IDealStatus";

interface IDeal {
    id: number,
    name: string,
    notes: string,
    dealStatus: IDealStatus,
    stageId: number,
    stageName: string,
    pipelineName: string,
    createdAt: string,
    updatedAt: string,
}

export default class Deal {
    public data: IDeal;

    constructor(data: any) {
        this.data = data;
    }

    public getId(): number {
        return this.data.id;
    }

    public getName(): string {
        return this.data.name;
    }

    public getDealStatus(): IDealStatus {
        return this.data.dealStatus;
    }

    public getNotes(): string {
        return this.data.notes;
    }

    public getStageName(): string {
        return this.data.stageName;
    }

    public getPipelineName(): string {
        return this.data.pipelineName;
    }

    public getCreatedAt(): DateHandle {
        return new DateHandle(this.data.createdAt);
    }

    public getUpdatedAt(): DateHandle {
        return new DateHandle(this.data.updatedAt);
    }
}