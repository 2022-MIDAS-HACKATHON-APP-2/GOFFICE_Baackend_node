import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserEntity } from "../entities/User";
import crypto from "crypto";
import { getManager } from "typeorm";
import { CompanyEntity } from "../entities/Company";
const salt = process.env.SALT;

export async function createUser(req: Request, res: Response) {
  const userRepository = getManager().getRepository(UserEntity);
  const companyRepository = getManager().getRepository(CompanyEntity);

  const { email, name, password, phone_number, companyName, position, department } = req.body;

  const hashPassword = crypto
    .createHash('sha512')
    .update(password + salt)
    .digest('hex');

  try{

    const company = await companyRepository.findOne({
      where: { company_name : companyName }
    });
    if(!company) return res.status(404).json({ message: "존재하지 않는 회사" });

    console.log(company);
    const newUser = userRepository.create({
      email,
      name,
      phone_number,
      password: hashPassword,
      company_id: company?.id,
      position : position,
      department: department
    });

    await userRepository.save(newUser);

    res.status(202).json({
      message: "회원가입 성공"
    });
  } catch(err) {
    console.error(err);
    res.status(409).json({
      message: "회원가입 실패"
  });
  }
};

export async function login(req: Request, res: Response) {
  const userRepository = getManager().getRepository(UserEntity);

  const { email, password } = req.body;
  const secretKey = req.app.get("jwt-secret");

  const hashPassword = crypto
      .createHash('sha512')
      .update(password + salt)
      .digest('hex')

  try{
      const user = await userRepository.findOne({
          where: {
              email: email
          }
      });

      if(user?.password == hashPassword) {
          const accessToken = jwt.sign(
              {
                  id: user.id,
                  position: user.position,
                  company_id: user.company_id
              }, secretKey,
              {
                  expiresIn: "100h"
              }
          );

          res.status(200).json({
              message: "로그인 성공",
              accessToken
          });
      } else {
          res.status(401).json({
              message: "맞지 않은 비밀번호"
          });
      }
  } catch(err) {
      console.error(err);
      res.status(404).json({
          message: "회원가입 되지 않은 이메일"
      });
  };
};