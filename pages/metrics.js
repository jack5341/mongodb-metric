import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

export default function Metrics() {
  const router = useRouter();

  if (router.query.token) {
    return <h1> {JSON.stringify(jwt.decode(router.query.token))} </h1>;
  }
  return null;
}
