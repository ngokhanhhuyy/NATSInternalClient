declare global {
    class TreatmentUpsertPhotoRequestDto implements IUpsertPhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };