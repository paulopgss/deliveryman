import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    // Validate user unique
    const clientExist = await prisma.clients.findFirst({
      where: { username: { equals: username, mode: "insensitive" } },
    });

    if (clientExist) {
      throw new Error("Client already exist");
    }

    // Crypt password
    const hashPassword = await hash(password, 10);

    // Create client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
