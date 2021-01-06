import Link from "next/link";

const NoLogged = (params) => {
  return (
    <>
      <h1>Hi there!</h1>
      <p>
        You are not signed in.
        <Link href={"/auth"}>
          <a>Sign in</a>
        </Link>
      </p>
    </>
  );
};
export default NoLogged;
