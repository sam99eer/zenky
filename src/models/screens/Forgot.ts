export interface IForgotSteps {
    step1: boolean;
    step2: boolean;
}

export interface IForgotData {
    email: string;
    otp: string;
    newPassword: string;
}
