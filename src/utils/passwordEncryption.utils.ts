import bcrypt from "bcrypt";
import config from "config";

const saltRounds = config.get<number>("saltWorkFactor");

export async function hashedPassword(password: string) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export async function comparedPasswordResult(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}
