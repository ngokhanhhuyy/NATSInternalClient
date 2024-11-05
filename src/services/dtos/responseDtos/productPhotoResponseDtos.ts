declare global {
    namespace ResponseDtos {
        namespace Product {
            type DetailPhoto = Implements<IDetailPhoto, {
                id: number;
                url: string;
            }>;
        }
    }
}

export { };