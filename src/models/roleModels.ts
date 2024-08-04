import type {
    RoleBasicResponseDto,
    RoleDetailResponseDto,
    RoleListResponseDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";

export class RoleBasicModel extends Model {
    public id: number;
    public name: string;
    public displayName: string;
    public powerLevel: number;

    constructor(responseDto: RoleBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.displayName = responseDto.displayName;
        this.powerLevel = responseDto.powerLevel;
    }
}

export class RoleDetailModel extends Model {
    public id: number;
    public name: string;
    public displayName: string;
    public powerLevel: number;
    public permissions: string[];

    constructor(responseDto: RoleDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.displayName = responseDto.displayName;
        this.powerLevel = responseDto.powerLevel;
        this.permissions = responseDto.permissions;
    }
}

export class RoleOptionsModel extends Model {
    public items: RoleBasicModel[];

    constructor(responseDto: RoleListResponseDto) {
        super();
        this.items = responseDto.items.map(dto => new RoleBasicModel(dto));
    }
}