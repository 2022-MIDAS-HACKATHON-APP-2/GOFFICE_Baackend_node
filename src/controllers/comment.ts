import { Request, Response } from "express";
import { CommentEntity } from "../entities/Comment";
import { getManager } from "typeorm";
import { UserEntity } from "../entities/User";
import { PostEntity } from "../entities/Post";

export async function writeComment(req: Request, res: Response) {
    const commentRepository = getManager().getRepository(CommentEntity);
    const postRepository = getManager().getRepository(PostEntity);
    const user = (<any>req).decoded;
    const postId = Number(req.params.post_id);
    const { content } = req.body;

    try{
        const post = await postRepository.findOne({ where: { id : postId, company_id: user.company_id }})

        if(post){
            commentRepository.create({
                user_id: user.id,
                post_id: postId,
                content,
            });
            res.status(202).json({
                messgae: "댓글 작성 성공"
            });
        } else throw Error;
    } catch(err) {
        console.error(err);
        res.status(404).json({
            messgae: "해당 게시글 찾을 수 없음"
        });
    }
};

export async function updateComment(req: Request, res: Response) {
    const commentRepository = getManager().getRepository(CommentEntity);
    const postRepository = getManager().getRepository(PostEntity);
    const commentId = Number(req.params.comment_id);
    const user = (<any>req).decoded;
    const postId = Number(req.params.post_id);
    const { content } = req.body;

    try{
        const comment = await commentRepository.findOne({ where: { id : commentId, user_id: user.id }})

        if(comment){
            commentRepository.update({
                id: commentId
            }, { content });
            res.status(200).json({
                messgae: "댓글 수정 성공"
            });
        } else throw Error;
    } catch(err) {
        console.error(err);
        res.status(403).json({
            messgae: "본인 댓글만 수정 가능"
        });
    }
};

export async function deleteComment(req: Request, res: Response) {
    const commentRepository = getManager().getRepository(CommentEntity);
    const postRepository = getManager().getRepository(PostEntity);
    const commentId = Number(req.params.comment_id);
    const user = (<any>req).decoded;
    const postId = Number(req.params.post_id);
    const { content } = req.body;

    try{
        const comment = await commentRepository.findOne({ where: { id : commentId, user_id: user.id }})

        if(comment){
            commentRepository.delete({
                id: commentId
            });
            res.status(200).json({
                messgae: "댓글 삭제 성공"
            });
        } else throw Error;
    } catch(err) {
        console.error(err);
        res.status(403).json({
            messgae: "본인 댓글만 삭제 가능"
        });
    }
};