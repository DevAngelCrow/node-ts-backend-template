import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

const prismaClient = new PrismaClient();
const prismaClientKnownRequestError = PrismaClientKnownRequestError;
const prismaClientUnknownRequestError = PrismaClientUnknownRequestError;

export {
    prismaClient,
    PrismaClientKnownRequestError,
    prismaClientUnknownRequestError
}