declare global {
    class RoleBasicResponseDto implements IBasicResponseDto {
        id: number;
        name: string;
        displayName: string;
        powerLevel: number;
    }

    class RoleDetailResponseDto {
        id: number;
        name: string;
        displayName: string;
        powerLevel: number;
        permissions: string[];
    }

    class RoleListResponseDto {
        items: RoleBasicResponseDto[];
    }
}

export { };