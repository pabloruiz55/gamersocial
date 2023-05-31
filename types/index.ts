import { User, Post } from "@prisma/client";

export type FullPostType = Post & {
    user: User
};