export declare type GroupDTO = {
    id: number;
    name: string;
    isPublic: boolean;
};
export declare type GroupRoleDTO = 'admin' | 'member';
export declare type GroupMemberDTO = {
    userId: number;
    groupId: number;
    role: GroupRoleDTO;
};
