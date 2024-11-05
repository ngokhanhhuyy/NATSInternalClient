import { TreatmentPhotoType } from "@enums";

declare global {
    type TreatmentPhotoResponseDto = InstanceType<typeof ResponseDtos.Treatment.Photo>;

    namespace ResponseDtos {
        namespace Treatment {
            class Photo implements IPhoto {
                id: number;
                url: string;
                type: TreatmentPhotoType;
            }
        }
    }
}

export { };