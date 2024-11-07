declare global {
    namespace RequestDtos {
        namespace ProductCategory {
            type List = PartialImplements<IPaginatedList, {
                page: number;
                resultsPerPage: number;
            }>;
    
            type Upsert = {
                name: string;
            }
        }
    }
}

export { };