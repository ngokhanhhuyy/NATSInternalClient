declare global {
    type SupplyUpsertPhotoRequestDto = InstanceType<typeof RequestDtos.Supply.UpsertPhoto>;

    namespace RequestDtos {
        namespace Supply {
            class UpsertPhoto implements IUpsertPhotoRequestDto {
                id: number | null;
                file: string | null;
                hasBeenChanged: boolean;
                hasBeenDeleted: boolean;
            }
        }
    }
}

export { };