declare global {
    class OrderUpsertPhotoRequestDto implements IUpsertPhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };