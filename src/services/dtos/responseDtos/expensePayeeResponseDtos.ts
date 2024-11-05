declare global {
    namespace ResponseDtos {
        namespace Expense {
            type Payee = Implements<IBasic, {
                id: number;
                name: string;
            }>;
        }
    }
}

export { };