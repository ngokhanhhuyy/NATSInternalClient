declare global {
    interface SupplyPhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };