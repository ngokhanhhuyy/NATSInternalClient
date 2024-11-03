export class ProductCategoryBasicModel implements IUpsertableBasicModel {
    public readonly id: number;
    public readonly name: string;
    public readonly authorization: ProductCategoryAuthorizationModel | null;

    constructor(responseDto: ProductCategoryResponseDto) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.authorization = responseDto.authorization &&
            new ProductCategoryAuthorizationModel(responseDto.authorization);
    }
}

export class ProductCategoryListModel implements IUpsertableListModel  {
    public sortingByField: string = "";
    public sortingByAscending: boolean = true;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ProductCategoryBasicModel[] = [];
    public authorization: ProductCategoryListAuthorizationModel | null = null;

    constructor(responseDto?: ProductCategoryListResponseDto) {
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
            this.authorization = responseDto.authorization &&
                new ProductCategoryListAuthorizationModel(responseDto.authorization);
        }
    }

    public mapFromResponseDto(responseDto: ProductCategoryListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ProductCategoryBasicModel(i)) ?? [];
    }

    public toRequestDto(): ProductCategoryListRequestDto {
        return {
            orderByAscending: this.sortingByAscending,
            orderByField: this.sortingByField,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ProductCategoryUpsertModel implements IUpsertModel {
    public id: number = 0;
    public name: string = "";

    constructor(responseDto?: ProductCategoryResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.name = responseDto.name;
        }
    }

    public toRequestDto(): ProductCategoryUpsertRequestDto {
        return { name: this.name };
    }
}

export class ProductCategoryListAuthorizationModel
        implements IUpsertableListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: ProductCategoryListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class ProductCategoryAuthorizationModel implements IUpsertableExistingAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: ProductCategoryAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}