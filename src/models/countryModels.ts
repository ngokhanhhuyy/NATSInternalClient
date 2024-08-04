import type { CountryRequestDto } from "@/services/dtos/requestDtos/countryRequestDtos";
import type { CountryResponseDto } from "@/services/dtos/responseDtos/countryResponseDtos";
import { Model } from "./baseModels";

export class CountryModel extends Model {
    public id: number;
    public name: string;
    public code: string;

    constructor(responseDto: CountryResponseDto) {
        super();
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.code = responseDto.code;
    }

    public toRequestDto(): CountryRequestDto {
        return { id: this.id };
    }
}