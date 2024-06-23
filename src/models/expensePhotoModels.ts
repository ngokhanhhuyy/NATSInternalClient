import type { ExpensePhotoRequestDto } from "@/services/dtos/requestDtos/expensePhotoRequestDtos";
import type { ExpensePhotoResponseDto } from "@/services/dtos/responseDtos/expensePhotoResponseDtos";
import { usePhotoUtility } from "@/utilities/photoUtility";

export class ExpensePhotoModel {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;

    constructor(responseDto: ExpensePhotoResponseDto) {
        const photoUtility = usePhotoUtility();
        this.id = responseDto.id;
        this.url = photoUtility.getPhotoUrl(responseDto.url);
    }

    public toRequestDto(): ExpensePhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}