declare global {
    namespace ResponseDtos {
        namespace Order {
            type DetailPhoto = Implements<IDetailPhoto, {
                id: number;
                url: string;
            }>;
        }
    }
}

export { };
