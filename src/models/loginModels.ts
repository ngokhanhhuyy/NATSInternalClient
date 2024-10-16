import type { SignInRequestDto } from "@/services/dtos/requestDtos/userRequestDtos";

export class LoginModel {
    public userName: string = "";
    public password: string = "";

    public toRequestDto(): SignInRequestDto {
        return {
            userName: this.userName,
            password: this.password
        };
    }
}