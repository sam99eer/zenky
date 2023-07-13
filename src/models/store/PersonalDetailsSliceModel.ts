import { IProfileData } from 'src/models/screens/Profile';

export interface IPersonalDetails {
    token: string | null;
    isLoggedIn: boolean;
    profileData: IProfileData;
}
