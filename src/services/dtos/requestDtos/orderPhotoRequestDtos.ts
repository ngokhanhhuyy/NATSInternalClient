export interface OrderPhotoRequestDto {
    id: number | null;
    file: string | null;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}