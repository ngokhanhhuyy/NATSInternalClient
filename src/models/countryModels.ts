import type { CountryRequestDto } from "@/services/dtos/requestDtos/countryRequestDtos";
import type { CountryResponseDto } from "@/services/dtos/responseDtos/countryResponseDtos";

export class CountryModel {
    public id: number;
    public name: string;
    public code: string;

    constructor(responseDto: CountryResponseDto) {
        this.id = responseDto.id;
        this.name = responseDto.name;
        this.code = responseDto.code;
    }

    public toRequestDto(): CountryRequestDto {
        return { id: this.id };
    }
}