export interface UserStatus {
    id: number;
    name: string;
}

export interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
    email: string;
    phoneNumber: string;
    suspensionReason: string;
    dateCreated: string;
    status: UserStatus;
    type: string;
    profilePicture: string;
    role: number;
}