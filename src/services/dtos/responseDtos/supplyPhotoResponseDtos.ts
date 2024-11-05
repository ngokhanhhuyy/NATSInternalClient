declare global {
    namespace ResponseDtos {
        namespace Supply {
            type DetailPhoto = Implements<IDetailPhoto, {
                id: number;
                url: string;
            }>;
        }
    }
}

export { };