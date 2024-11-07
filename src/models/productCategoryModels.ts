import { ListSortingOptionsModel } from "./listSortingModels";

export class ProductCategoryMinimalModel {
    public readonly id: number;
    public readonly name: string;

    constructor(responseDto: ResponseDtos.ProductCategory.Minimal) {
        this.id = responseDto.id;
        this.name = responseDto.name;
    }
}

export class ProductCategoryBasicModel
        implements IUpsertableBasicModel<ProductCategoryExistingAuthorizationModel> {
    public readonly id: number;
    public readonly name: string;
    public readonly authorization: ProductCategoryExistingAuthorizationModel | null;

    constructor(responseDto: ResponseDtos.ProductCategory.Basic) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.authorization = responseDto.authorization &&
            new ProductCategoryExistingAuthorizationModel(responseDto.authorization);
    }
}

export class ProductCategoryListModel
        implements IUpsertableListModel<
            ProductCategoryBasicModel,
            ProductCategoryExistingAuthorizationModel>  {
    private _sortingOptions: ListSortingOptionsModel | undefined;
    public sortByField: string | undefined;
    public sortByAscending: boolean | undefined;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ProductCategoryBasicModel[] = [];

    constructor(responseDto: ResponseDtos.ProductCategory.List) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ProductCategoryBasicModel(i)) ?? [];
    }

    public get sortingOptions(): ListSortingOptionsModel | undefined {
        return this._sortingOptions;
    }

    public set sortingOptions(optionsResponseDto: ResponseDtos.List.SortingOptions) {
        this._sortingOptions = new ListSortingOptionsModel(optionsResponseDto);
        this.sortByField ??= this._sortingOptions.defaultFieldName;
        this.sortByAscending ??= this._sortingOptions.defaultAscending;
    }

    public toRequestDto(): RequestDtos.ProductCategory.List {
        return {
            page: this.page === 1 ? this.page : undefined,
            resultsPerPage: this.resultsPerPage === 15 ? this.resultsPerPage : undefined
        };
    }
}

export class ProductCategoryUpsertModel {
    public id: number = 0;
    public name: string = "";

    constructor(responseDto?: ResponseDtos.ProductCategory.Detail) {
        if (responseDto) {
            this.id = responseDto.id;
            this.name = responseDto.name;
        }
    }

    public toRequestDto(): RequestDtos.ProductCategory.Upsert {
        return { name: this.name };
    }
}

export class ProductCategoryExistingAuthorizationModel
        implements IUpsertableExistingAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: ResponseDtos.ProductCategory.ExistingAuthorization) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}