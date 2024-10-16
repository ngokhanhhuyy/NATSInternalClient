import type {
    BrandRequestDto,
    BrandUpsertRequestDto } from "@/services/dtos/requestDtos/brandRequestDtos";
import type {
    BrandAuthorizationResponseDto,
    BrandBasicResponseDto,
    BrandDetailResponseDto,
    BrandListResponseDto } from "@/services/dtos/responseDtos/brandResponseDtos";
import { CountryModel } from "./countryModels";

export class BrandBasicModel {
    public id: number;
    public name: string;

    constructor(responseDto: BrandBasicResponseDto) {
        this.id = responseDto.id;
        this.name = responseDto.name;
    }

    public toRequestDto(): BrandRequestDto {
        return { id: this.id };
    }
}

export class BrandListModel {
    public items: BrandBasicModel[] = [];
    public authorization!: BrandAuthorizationModel;

    constructor(responseDto?: BrandListResponseDto) {
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: BrandListResponseDto) {
        if (responseDto.items) {
            this.items = responseDto.items.map(dto => new BrandBasicModel(dto));
        }
        this.authorization = new BrandAuthorizationModel(responseDto.authorization);
    }
}

export class BrandAuthorizationModel {
    public canCreate: boolean;
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: BrandAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class BrandUpsertModel {
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
            countryId: this.country?.toRequestDto() || null
        };
    }
}