declare global {
    namespace ResponseDtos.Role {
        type Basic = Implements<IBasic, {
            id: number;
            name: string;
            displayName: string;
            powerLevel: number;
        }>;
    
        type Detail = {
            id: number;
            name: string;
            displayName: string;
            powerLevel: number;
            permissions: string[];
        }
    }
}

export { };