export declare enum UserRoleDTO {
    Admin = "admin"
}
export declare type UserMeResponseDTO = {
    id: number;
    role: UserRoleDTO;
    email: string;
    fullName: string;
    avatar?: string;
};
