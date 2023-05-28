import DateHandle from "@/api/DateHandle";
import { IDealStatus } from "./IDealStatus";

interface IDeal {
    id: number,
    name: string,
    dealStatus: IDealStatus,
    stageId: number,
    stageName: string,
    pipelineId: number,
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

    public getPipelineId(): number {
        return this.data.pipelineId;
    }

    public getStageId(): number {
        return this.data.stageId;
    }

    public setStageId(id: number): void {
        this.data.stageId = id;
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