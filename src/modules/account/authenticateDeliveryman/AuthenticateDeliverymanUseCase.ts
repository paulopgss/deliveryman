import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Verify username and password
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new Error("Deliveryman not found");
    }

    // Verify that the password corresponds to the username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    // Generate a token
    const token = sign({ username }, "98d7fc1c47596c741f869d874ee37992", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}
