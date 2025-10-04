import { Prisma, PrismaClient } from '../src/generated/prisma';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty'
});


type SafeUserCreateInput=Prisma.PostCreateInput;

  type UnsafeUserCreateInput=Prisma.PostUncheckedCreateInput ;


  type UserTypeDelegate=Prisma.PostDelegate;
  
  type SafeUserTypeDelegate=typeof Prisma.user;