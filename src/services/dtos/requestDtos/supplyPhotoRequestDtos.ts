declare global {
    class SupplyUpsertPhotoRequestDto implements IUpsertPhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };