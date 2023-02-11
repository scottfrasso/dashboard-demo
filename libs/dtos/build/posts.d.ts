export declare type PostDTO = {
    id: number;
    groupId: number;
    imageURL?: string;
    content?: string;
    createdAt: string;
};
export declare type ReactionTypeDTO = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
export declare type ReactionDTO = {
    id: number;
    emoji: string;
    userId: number;
};
