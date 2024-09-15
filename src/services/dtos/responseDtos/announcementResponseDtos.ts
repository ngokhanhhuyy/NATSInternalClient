import type {AnnouncementCategory} from "@/services/dtos/enums";
import type {UserBasicResponseDto} from "@/services/dtos/responseDtos/userResponseDtos";

export interface AnnouncementListResponseDto {
    items: AnnouncementResponseDto[] | null;
    pageCount: number;
}

export interface AnnouncementResponseDto {
    id: number;
    category: AnnouncementCategory;
    title: string;
    content: string;
    startingDateTime: string;
    endingDateTime: string;
    createdUser: UserBasicResponseDto
}