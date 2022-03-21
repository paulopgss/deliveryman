import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    // Validate user unique
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: { username: { equals: username, mode: "insensitive" } },
    });

    if (deliverymanExist) {
      throw new Error("Deliveryman already exist");
    }

    // Crypt password
    const hashPassword = await hash(password, 10);

    // Create deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman;
  }
}
