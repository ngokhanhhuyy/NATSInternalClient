export interface IPhotoUpsertRequestDto {
    id: number | null;
    file: string | null;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}