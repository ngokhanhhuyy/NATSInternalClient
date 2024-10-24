declare global {
    interface ProductPhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };