declare global {
    namespace List {
        type SortingOptions = {
            fieldOptions: SortingByField[] | null;
            defaultFieldName: string | null;
            defaultAscending: boolean;
        }
    
        type SortingByField = {
            name: string;
            displayName: string;
        }
    }
}

export { };