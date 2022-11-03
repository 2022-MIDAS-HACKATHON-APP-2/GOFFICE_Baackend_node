import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PostEntity } from "../entities/Post";
import { getManager } from "typeorm";

export async function CreatePost(req: Request, res: Response) {
    const postRepository =  getManager().getRepository(PostEntity);

    const { title, content, field } = req.body;
    const user = (<any>req).decoded;

    try{
        const newPost = postRepository.create({
            title,
            content,
            user_id : user.id,
            field,
            company_id: user.company_id, 
        })
        await postRepository.save(newPost);

        res.status(200).json({
            message: "게시글 작성 성공",
            newPost
        });
    } catch(err) {
        console.error(err);

        res.status(400).json({
            message: "게시글 작성 실패"
        });
    }
}

export async function updatePost(req: Request, res: Response) {
    const postRepository = getManager().getRepository(PostEntity);

    const { title, content } = req.body;
    const id = Number(req.params.id);
    const user = (<any>req).decoded;

    try{
        const post = await postRepository.findOne({ where: { id } });
        if(post == null) {
            throw Error;
        } else {
            await postRepository.update({
                id,
                user_id: user.id
            }, {
                title,
                content
            });
            
            res.status(200).json({
                message: "게시글 수정 성공",
            });
        }
    } catch(err) {
        console.error(err);

        res.status(403).json({
            message: "게시글 수정 실패"
        })
    }
};

export async function deletePost(req: Request, res: Response) {
    const postRepository = getManager().getRepository(PostEntity);
    const id = Number(req.params.id);
    const user = (<any>req).decoded.id;

    try{
        const post = await postRepository.findOne({ where: { id } });

        if(post?.user_id == user.id) {
            postRepository.delete({
                id
            });
            res.status(200).json({
                message: "게시물 삭제 성공"
            });
        } else throw Error;
    } catch(err) {
        console.error(err);

        res.status(403).json({
            message: "게시물 삭제 실패"
        })
    }
};

export async function readOnePost(req: Request, res: Response) {
    const postRepository = getManager().getRepository(PostEntity);
    const id = Number(req.params.id);
    const user = (<any>req).decoded;
    try{
        const post = await postRepository.findOne(
            { where: { id } }
        );
        if(post?.company_id == user.company_id) {
            res.status(200).json({
                message: "게시물 삭제 성공",
                post
            });
        } else throw Error;
    } catch(err) {
        console.error(err);
        res.status(403).json({
            message: "게시글 조회 권한 없음"
        })
    }
};

export async function readAllPost(req: Request, res: Response) {
    const postRepository = getManager().getRepository(PostEntity);
    const user = (<any>req).decoded;
    try{
        const post = await postRepository.find(
            { where: { company_id : user.company_id } }
        );
        res.status(200).json({
            message: "게시물 삭제 성공",
            post
        })
    } catch(err) {
        console.error(err);
        res.status(403).json({
            message: "게시글 조회 권한 없음"
        })
    }
};