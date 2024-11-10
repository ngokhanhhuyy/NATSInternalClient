export class SignInModel {
    public userName: string = "";
    public password: string = "";

    public toRequestDto(): RequestDtos.SignIn {
        return {
            userName: this.userName,
            password: this.password
        };
    }
}