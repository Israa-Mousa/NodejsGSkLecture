import { User } from "../user.entity";
export interface UserRepositoryI {
  findAll(
    page: number,
    limit: number
  ): Promise<{ users: User[]; totalRecords: number }>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ): Promise<User>;
  update(
    id: number,
    name?: string,
    email?: string,
    avatar?: string
  ): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}