import useSWR from "swr";
import Link from "next/link";
import { useUser } from "../utils/auth/useUser";
import { getFiles } from "./api/storage";
import { useState } from "react";
import Search from "../components/Search";

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
    user ? ["/api/getFood", user.token] : null,
    fetcher
  );
  console.log(data);
  const onGetFiles = async () => {
    const { files, folders, nextPageToken } = await getFiles();
    console.log({ files, folders, nextPageToken });
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
      <div>
        <p>You're signed in. Email: {user.email}</p>
        <button onClick={onGetFiles}>Get files</button>
        <Search />
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
      {error && <div>Failed to fetch food!</div>}
      {data && !error && <div>Your favorite food is {data.food}.</div>}
      {data?.users && (
        <>
          <strong>Users</strong>
          {data.users.map(({ email }, k) => (
            <div>
              <p>{email}</p>
            </div>
          ))}
        </>
      )}
      <div>
        <b>Folders</b>
        {storage.folders.map((item, key) => (
          <div key={key}>{item?.name}</div>
        ))}
        <b>Files</b>
        {storage.files.map((item, key) => (
          <div key={key}>{item?.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Index;
