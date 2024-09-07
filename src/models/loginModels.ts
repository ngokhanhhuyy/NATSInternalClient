import type { LoginRequestDto } from "@/services/dtos/requestDtos/userRequestDtos";

export class LoginModel {
    public userName: string = "";
    public password: string = "";

    public toRequestDto(): LoginRequestDto {
        return {
            userName: this.userName,
            password: this.password
        };
    }
}