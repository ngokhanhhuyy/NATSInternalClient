declare global {
    namespace ResponseDtos {
        namespace Expense {
            type Photo = Implements<IDetailPhoto, {
                id: number;
                url: string;
            }>;
        }
    }
}

export { };