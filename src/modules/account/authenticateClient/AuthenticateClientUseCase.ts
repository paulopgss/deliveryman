import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Verify username and password
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error("Client not found");
    }

    // Verify that the password corresponds to the username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    // Generate a token
    const token = sign({ username }, "98d7fc1c47596c741f869d874ee37980", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
