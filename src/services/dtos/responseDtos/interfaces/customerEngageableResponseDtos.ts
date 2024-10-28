declare global {
    interface ICustomerEngageableBasicResponseDto
            extends IFinancialEngageableBasicResponseDto {
        customer: CustomerBasicResponseDto;
    }
}

export { };