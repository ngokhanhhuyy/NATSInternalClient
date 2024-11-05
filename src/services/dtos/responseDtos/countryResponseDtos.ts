declare global {
    namespace ResponseDtos {
        type Country = Implements<IBasic, {
            id: number;
            name: string;
            code: string;
        }>;
    }
}

export { };