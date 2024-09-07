export enum ServiceErrorType {
    NotFoundError,
    ValidationError,
    OperationError,
    ConnectionError,
    ParsingError
}

export class ServiceResult<TResponseDto> {
    private readonly _errors: ServiceError[] = [];
    private readonly _responseDto: TResponseDto | null = null;
    
    constructor(responseDto: TResponseDto | null, errors: ServiceError[] | null) {
        this._responseDto = responseDto;
        if (errors != null) {
            this._errors = errors;
        }
    }
    
    public get errors(): ServiceError[] {
        return this._errors;
    }
    
    public get responseDto(): TResponseDto | null {
        return this._responseDto;
    }
    
    public get succeeded(): boolean {
        return this._errors.length === 0;
    }
    
    public get hasNotFoundError(): boolean {
        return this._errors
            .findIndex(e => e.errorType === ServiceErrorType.NotFoundError) != -1;
    }
    
    public get hasValidationError(): boolean {
        return this._errors
            .findIndex(e => e.errorType === ServiceErrorType.ValidationError) != -1;
    }
    
    public get hasOperationError(): boolean {
        return this._errors
            .findIndex(e => e.errorType === ServiceErrorType.OperationError) != -1;
    }
    
    static parseResponseDtoFromJson<TResponseDto>(json: string): ServiceResult<TResponseDto> {
        try {
            let responseDto: TResponseDto = JSON.parse(json);
            return new ServiceResult<TResponseDto>(responseDto, null);
        } catch (error) {
            return new ServiceResult<TResponseDto>(null, [{
                propertyName: "",
                errorMessage: null,
                errorType: ServiceErrorType.ParsingError
            }])
        }
    }
    
    static parseErrorsFromJson<TResponseDto>(json: string): ServiceResult<TResponseDto> {
        try {
            let errors: ServiceError[] = JSON.parse(json);
            return new ServiceResult<TResponseDto>(null, errors);
        } catch (error) {
            return new ServiceResult<TResponseDto>(null, [{
                propertyName: "",
                errorMessage: null,
                errorType: ServiceErrorType.ParsingError
            }])
        }
    }
    
    static NotFoundError<TResponseDto>(propertyName: string): ServiceResult<TResponseDto> {
        return new ServiceResult<TResponseDto>(null, [{
            propertyName: propertyName,
            errorMessage: null,
            errorType: ServiceErrorType.NotFoundError
        }]);
    }
    
    static ConnectionError<TResponseDto>(): ServiceResult<TResponseDto> {
        return new ServiceResult<TResponseDto>(null, [{
            propertyName: "",
            errorMessage: null,
            errorType: ServiceErrorType.ConnectionError
        }]);
    }
    
    static success<TResponseDto>(responseDto: TResponseDto): ServiceResult<TResponseDto> {
        return new ServiceResult<TResponseDto>(responseDto, null);
    }
    
    static failed<TResponseDto>(errors: ServiceError[]): ServiceResult<TResponseDto> {
        return new ServiceResult<TResponseDto>(null, errors);
    }
}

export type ServiceError = {
    propertyName: string;
    errorMessage: string | null;
    errorType: ServiceErrorType;
}