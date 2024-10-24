declare global {
    interface RoleBasicResponseDto {
        id: number;
        name: string;
        displayName: string;
        powerLevel: number;
    }

    interface RoleDetailResponseDto {
        id: number;
        name: string;
        displayName: string;
        powerLevel: number;
        permissions: string[];
    }

    interface RoleListResponseDto {
        items: RoleBasicResponseDto[];
    }
}

export { };