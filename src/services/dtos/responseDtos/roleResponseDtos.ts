declare global {
    type RoleBasicResponseDto = InstanceType<typeof ResponseDtos.Role.Basic>;
    type RoleDetailResponseDto = InstanceType<typeof ResponseDtos.Role.Detail>;
    type RoleListResponseDto = InstanceType<typeof ResponseDtos.Role.List>;

    namespace ResponseDtos {
        namespace Role {
            class Basic implements IBasic {
                id: number;
                name: string;
                displayName: string;
                powerLevel: number;
            }
        
            class Detail {
                id: number;
                name: string;
                displayName: string;
                powerLevel: number;
                permissions: string[];
            }
        
            class List {
                items: Basic[];
            }
        }
    }
}

export { };