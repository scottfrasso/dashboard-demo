export declare enum UserRoleDTO {
    Admin = "admin"
}
export declare type UserDTO = {
    id: number;
    role: UserRoleDTO;
    fullName: string;
    avatar?: string;
};
export declare type UserMeResponseDTO = UserDTO & {
    email: string;
};
