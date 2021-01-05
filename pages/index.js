import useSWR from "swr";
import Link from "next/link";
import { useUser } from "../utils/auth/useUser";
import { getFiles } from "./api/storage";
import { useState } from "react";
import Search from "../components/Search";
import Files from "../components/Files";
import Users from "../components/Users";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const Index = () => {
  const { user, logout } = useUser();
  const [storage, setStorage] = useState({ folders: [], files: [] });
  const { data, error } = useSWR(
    user ? ["/api/getUsers", user.token] : null,
    fetcher
  );
  const onGetFiles = async () => {
    const { files, folders, nextPageToken } = await getFiles();
    // console.log({ files, folders, nextPageToken });
    setStorage({ files, folders });
  };
  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{" "}
          <Link href={"/auth"}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    );
  }

  return (
    <div>
      <Search />
      <div>
        <p>You're signed in. Email: {user.email}</p>
        <button onClick={onGetFiles}>Get files</button>
        <br />
        <p
          style={{
            display: "inline-block",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
      </div>
      <div>
        <Link href={"/example"}>
          <a>Another example page</a>
        </Link>
      </div>
      {error && <div>Failed to fetch!</div>}
      <Users users={data?.users} />
      <Files files={storage.files} folders={storage.folders} />
    </div>
  );
};

export default Index;
