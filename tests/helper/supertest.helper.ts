import { app } from   "../../server";


import TestAgent from 'supertest/lib/agent';
import supertest from "supertest";

import { userData } from "../../module/user/user.data";
import { signJwt } from "../../module/auth/util/jwt.util";
  export  let authedTestClient: TestAgent;
  export  let unAuthedTestClient: TestAgent;

const user1 = userData[0]!;
//  generate token
const token = signJwt({ name: user1.name, sub: user1.id });

export const unAuthedTestAgent = supertest.agent(app);

export const authedTestAgent = supertest
  .agent(app)
  .set('AUTHORIZATION', `Bearer ${token}`);


