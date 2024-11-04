declare global {
    class CountryResponseDto implements IBasicResponseDto {
        id: number;
        name: string;
        code: string;
    }
}

export { };