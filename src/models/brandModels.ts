import { CountryModel } from "./countryModels";
import { usePhotoUtility } from "@/utilities/photoUtility";

const photoUtility = usePhotoUtility();

export class BrandBasicModel implements IUpsertableBasicModel, IHasPhotoBasicModel {
    public readonly id: number;
    public readonly name: string;
    public readonly thumbnailUrl: string;
    public readonly authorization: BrandAuthorizationModel | null;

    constructor(responseDto: BrandBasicResponseDto) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.authorization = responseDto.authorization &&
            new BrandAuthorizationModel(responseDto.authorization);
    }
}

export class BrandListModel implements IUpsertableListModel {
    public sortingByField: string = "";
    public sortingByAscending: boolean = true;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: BrandBasicModel[] = [];
    public authorization: BrandListAuthorizationModel | null = null;

    constructor(responseDto?: BrandListResponseDto) {
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: BrandListResponseDto) {
        if (responseDto.items) {
            this.pageCount = responseDto.pageCount;
            this.items = responseDto.items.map(dto => new BrandBasicModel(dto));
        }
        this.authorization = responseDto.authorization &&
            new BrandListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): BrandListRequestDto {
        return {
            orderByField: this.sortingByField,
            orderByAscending: this.sortingByAscending,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class BrandListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: BrandListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class BrandAuthorizationModel implements IUpsertableExistingAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;

    constructor(responseDto: BrandExistingAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class BrandUpsertModel implements IHasSinglePhotoUpsertModel {
    public id: number = 0;
    public name: string = "";
    public website: string = "";
    public socialMediaUrl: string = "";
    public phoneNumber: string = "";
    public email: string = "";
    public address: string = "";
    public thumbnailUrl: string | null = null;
    public thumbnailFile: string | null = null;
    public thumbnailChanged: boolean = false;
    public country: CountryModel | null = null;
    public authorization?: BrandAuthorizationModel;

    constructor(responseDto?: BrandDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id,
            this.name = responseDto.name,
            this.website = responseDto.website?.replace("https://", "") || "",
            this.socialMediaUrl = responseDto.socialMediaUrl?.replace("https://", "") || "",
            this.phoneNumber = responseDto.phoneNumber || "",
            this.email = responseDto.email || "",
            this.address = responseDto.address || "",
            this.thumbnailUrl = responseDto.thumbnailUrl,
            this.thumbnailFile = null,
            this.thumbnailChanged = false,
            this.country = responseDto.country && new CountryModel(responseDto.country);
            this.authorization = new BrandAuthorizationModel(responseDto.authorization);
        }
    }

    public toRequestDto(): BrandUpsertRequestDto {
        return {
            name: this.name,
            website: this.website || null,
            socialMediaUrl: this.socialMediaUrl || null,
            phoneNumber: this.phoneNumber || null,
            email: this.email || null,
            address: this.address || null,
            thumbnailFile: this.thumbnailFile || null,
            thumbnailChanged: this.thumbnailChanged,
            countryId: this.country?.id || null
        };
    }
}