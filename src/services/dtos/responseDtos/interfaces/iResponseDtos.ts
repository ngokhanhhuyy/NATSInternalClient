declare global {
    namespace ResponseDtos {
        interface IBasic {
            id: number;
        }
        
        interface IList<TBasic extends IBasic> {
            pageCount: number;
            items: TBasic[];
        }
    }
}

export { };