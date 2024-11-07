export class RoleBasicModel {
    public id: number;
    public name: string;
    public displayName: string;
    public powerLevel: number;

    constructor(responseDto: ResponseDtos.Role.Basic) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.displayName = responseDto.displayName;
        this.powerLevel = responseDto.powerLevel;
    }
}

export class RoleDetailModel {
    public id: number;
    public name: string;
    public displayName: string;
    public powerLevel: number;
    public permissions: string[];

    constructor(responseDto: ResponseDtos.Role.Detail) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.displayName = responseDto.displayName;
        this.powerLevel = responseDto.powerLevel;
        this.permissions = responseDto.permissions;
    }
}

export class RoleOptionsModel {
    public items: RoleBasicModel[];

    constructor(responseDto: ResponseDtos.Role.List) {
        this.items = responseDto.items.map(dto => new RoleBasicModel(dto));
    }
}