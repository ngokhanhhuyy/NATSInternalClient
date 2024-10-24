declare global {
    interface TreatmentUpsertPhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };