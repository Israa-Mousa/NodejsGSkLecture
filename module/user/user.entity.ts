export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  password: string; // hash value
}
