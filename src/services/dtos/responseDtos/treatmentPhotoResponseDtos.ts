import { TreatmentPhotoType } from "@enums";

declare global {
    namespace ResponseDtos {
        namespace Treatment {
            type Photo = Implements<IDetailPhoto, {
                id: number;
                url: string;
                type: TreatmentPhotoType;
            }>;
        }
    }
}

export { };