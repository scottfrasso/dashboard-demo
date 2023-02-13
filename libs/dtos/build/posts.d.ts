import { UserDTO } from './users';
export declare type PostDTO = {
    id: number;
    groupId: number;
    imageURL?: string;
    content?: string;
    createdAt: string;
    author: UserDTO;
};
export declare type ReactionTypeDTO = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
export declare type ReactionDTO = {
    id: number;
    emoji: string;
    userId: number;
};
export declare type CreatePostDTO = {
    groupId: number;
    imageURL?: string;
    content?: string;
};
