export type RoleBasicResponseDto = {
    id: number;
    name: string;
    displayName: string;
    powerLevel: number;
};

export interface RoleDetailResponseDto {
    id: number;
    name: string;
    displayName: string;
    powerLevel: number;
    permissions: string[];
}

export interface RoleListResponseDto {
    items: RoleBasicResponseDto[];
};