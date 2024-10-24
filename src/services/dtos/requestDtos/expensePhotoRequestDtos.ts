declare global {
    interface ExpensePhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };