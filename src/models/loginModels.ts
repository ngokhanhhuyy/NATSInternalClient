export class SignInModel {
    public userName: string = "";
    public password: string = "";

    public toRequestDto(): SignInRequestDto {
        return {
            userName: this.userName,
            password: this.password
        };
    }
}