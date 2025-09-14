import { User } from './user.entity';


export const getUserData = ():  User[] => [
  {
      id: 'u1',
      name: 'Alice Johnson',  
      email: 'alice@example.com',
      createdAt: new Date('2025-01-01T10:00:00Z'),
      updatedAt: new Date('2025-01-01T10:00:00Z'),
      password: 'hashedpassword123',
    },
    {
      id: 'u2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      createdAt: new Date('2025-02-01T12:00:00Z'),
      updatedAt: new Date('2025-02-01T12:00:00Z'),
            password: 'hashedpassword123',

    },
    {
      id: 'u3',
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      createdAt: new Date('2025-03-01T14:30:00Z'),
      updatedAt: new Date('2025-03-01T14:30:00Z'),
            password: 'hashedpassword123'

    }
];

export const userData= getUserData(); 