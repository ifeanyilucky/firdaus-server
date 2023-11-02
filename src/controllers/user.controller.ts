import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const data = await UserService.getUser(id);
  res.status(StatusCodes.OK).send({ success: true, data });
};
export const createUser = async (req: Request, res: Response) => {
  const values = JSON.parse(req.body.values);

  // const formData = req.bo
  const data = await UserService.createUser(values, req.file);
  res.status(StatusCodes.OK).send({
    success: true,
    data,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const {
    query: { role, teacherId },
  } = req;

  const data = await UserService.getUsers({
    query: {
      ...req.query,
    },
  });
  res.status(StatusCodes.OK).send({ success: true, data });
};

export const deleteUser = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;
  const data = await UserService.deleteUser(id);
  res.status(StatusCodes.OK).send({ success: true, data });
};

export const updateUser = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;
  const data = await UserService.updateUser(id, body);
  res.status(StatusCodes.OK).send({ success: true, data });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const data = await UserService.changePassword({
    oldPassword,
    newPassword,
    user: req.user,
  });

  res.status(StatusCodes.OK).json({ success: true, data });
};
