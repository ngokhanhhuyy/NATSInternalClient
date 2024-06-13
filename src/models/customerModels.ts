import { Gender } from "@/services/dtos/enums";
import type {
    CustomerListRequestDto,
    CustomerUpsertRequestDto } from "@/services/dtos/requestDtos/customerRequestDtos";
import type {
    CustomerBasicResponseDto,
    CustomerListResponseDto,
    CustomerDetailResponseDto } from "@/services/dtos/responseDtos/customerResponseDtos";
import { useAvatarUtility } from "@/utilities/avatarUtility";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class CustomerBasicModel {
    public id: number;
    public fullName: string;
    public nickName: string | null;
    public gender: Gender = Gender.Male;
    public phoneNumber: string | null;
    public avatarUrl: string;

    constructor(responseDto: CustomerBasicResponseDto) {
        const avatarUtility = useAvatarUtility();

        this.id = responseDto.id;
        this.fullName = responseDto.fullName;
        this.nickName = responseDto.nickName ;
        this.gender = responseDto.gender;
        this.phoneNumber = responseDto.phoneNumber;
        this.avatarUrl = avatarUtility.getAvatarUrlByFullName(responseDto.fullName);
    }
}

export class CustomerListModel {
    public orderByAscending: boolean = true;
    public orderByField: string = "lastName";
    public searchByContent: string = "";
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public results: CustomerBasicModel[] = [];

    constructor(response?: CustomerListResponseDto) {
        if (response) {
            this.mapFromResponseDto(response);
        }
    }

    public mapFromResponseDto(responseDto: CustomerListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.results = responseDto.results?.map(dto => new CustomerBasicModel(dto)) || [];
    }

    public toRequestDto(): CustomerListRequestDto {
        return {
            orderByField: this.orderByField,
            orderByAscending: this.orderByAscending,
            searchByContent: this.searchByContent,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class CustomerDetailModel {
    public id: number;
    public firstName: string;
    public middleName: string | null;
    public lastName: string;
    public fullName: string;
    public nickName: string | null;
    public gender: Gender;
    public birthday: string | null;
    public phoneNumber: string | null;
    public zaloNumber: string | null;
    public facebookUrl: string | null;
    public email: string | null;
    public address: string | null;
    public note: string | null;
    public createdDateTime: string;
    public updatedDateTime: string | null;
    public introducer: CustomerBasicModel | null;
    public avatarUrl: string;

    constructor(responseDto: CustomerDetailResponseDto) {
        const avatarUtility = useAvatarUtility();
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.firstName = responseDto.firstName;
        this.middleName = responseDto.middleName;
        this.lastName = responseDto.lastName;
        this.fullName = responseDto.fullName;
        this.nickName = responseDto.nickName;
        this.gender = responseDto.gender;
        this.birthday = responseDto.birthday;
        this.phoneNumber = responseDto.phoneNumber;
        this.zaloNumber = responseDto.zaloNumber;
        this.facebookUrl = responseDto.facebookUrl;
        this.email = responseDto.email;
        this.address = responseDto.address;
        this.note = responseDto.note;
        this.createdDateTime = dateTimeUtility
            .toDisplayDateTime(responseDto.createdDateTime)!;
        this.updatedDateTime = responseDto.updatedDateTime && dateTimeUtility
            .toDisplayDateTime(responseDto.updatedDateTime)!;
        this.introducer = responseDto.introducer && new CustomerBasicModel(responseDto.introducer);
        this.avatarUrl = avatarUtility.getAvatarUrlByFullName(responseDto.fullName);
    }
}

export class CustomerUpsertModel {
    public id: number = 0;
    public firstName: string = "";
    public middleName: string = "";
    public lastName: string = "";
    public nickName: string = "";
    public gender: Gender = Gender.Male;
    public birthday: string = "";
    public phoneNumber: string = "";
    public zaloNumber: string = "";
    public facebookUrl: string = "";
    public email: string = "";
    public address: string = "";
    public note: string = "";
    public introducerId: number | null = null;

    constructor(responseDto?: CustomerDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.firstName = responseDto.firstName;
            this.middleName = responseDto.middleName || "";
            this.lastName = responseDto.lastName;
            this.nickName = responseDto.nickName || "";
            this.gender = responseDto.gender;
            this.birthday = responseDto.birthday || "";
            this.phoneNumber = responseDto.phoneNumber || "";
            this.zaloNumber = responseDto.zaloNumber || "";
            this.facebookUrl = responseDto.facebookUrl || "";
            this.email = responseDto.email || "";
            this.address = responseDto.address || "";
            this.note = responseDto.note || "";
        }
    }

    public toRequestDto(): CustomerUpsertRequestDto {
        return {
            firstName: this.firstName || null,
            middleName: this.middleName || null,
            lastName: this.lastName || null,
            nickName: this.nickName || null,
            gender: this.gender,
            birthday: useDateTimeUtility()
                .toDateISOString(this.birthday) || null,
            phoneNumber: this.phoneNumber || null,
            zaloNumber: this.zaloNumber || null,
            facebookUrl: this.facebookUrl || null,
            email: this.email || null,
            address: this.address || null,
            note: this.note || null,
            introducerId: this.introducerId
        }
    }
}