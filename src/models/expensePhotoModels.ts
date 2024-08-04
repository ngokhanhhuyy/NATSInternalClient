import type { ExpensePhotoRequestDto } from "@/services/dtos/requestDtos/expensePhotoRequestDtos";
import type { ExpensePhotoResponseDto } from "@/services/dtos/responseDtos/expensePhotoResponseDtos";
import { Model } from "./baseModels";

export class ExpensePhotoModel extends Model {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;

    constructor(responseDto: ExpensePhotoResponseDto) {
        super();
        this.id = responseDto.id;
        this.url = responseDto.url;
    }

    public toRequestDto(): ExpensePhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}