declare global {
    type CountryResponseDto = InstanceType<typeof ResponseDtos.Country.Basic>;

    namespace ResponseDtos {
        namespace Country {
            class Basic implements IBasic {
                id: number;
                name: string;
                code: string;
            }
        }
    }
}

export { };