import type { LoginRequestDto } from "@/services/dtos/requestDtos/userRequestDtos";
import { Model } from "./baseModels";

export class LoginModel extends Model {
    public userName: string = "";
    public password: string = "";

    public toRequestDto(): LoginRequestDto {
        return {
            userName: this.userName,
            password: this.password
        };
    }
}