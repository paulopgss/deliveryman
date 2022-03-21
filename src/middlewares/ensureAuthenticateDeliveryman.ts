import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPaylod {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "98d7fc1c47596c741f869d874ee37992"
    ) as IPaylod;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
