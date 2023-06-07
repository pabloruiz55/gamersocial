import { User, Post } from "@prisma/client";

export type UserFull = User & {
  _count: {
    following: number,
    followers: number
  },
  isFollowed: boolean,
  isFollowingYou: boolean
};

export type FullPostType = Post & {
  user: UserFull
};