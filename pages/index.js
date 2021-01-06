import useSWR from "swr";
import Link from "next/link";
import { useUser } from "../utils/auth/useUser";
import { getFiles } from "./api/storage";
import { useState } from "react";
import Search from "../components/Search";
import Files from "../components/Files";
import Users from "../components/Users";
import UserLogged from "../components/UserLogged";
import NoLogged from "../components/NoLogged";
import fetcher from "../utils/fetcher";
const Index = () => {
  const { user, logout } = useUser();
  const [storage, setStorage] = useState({ folders: [], files: [] });
  const { data, error } = useSWR(
    user ? ["/api/getUsers", user.token] : null,
    fetcher
  );
  const onGetFiles = async () => {
    const { files, folders } = await getFiles();
    setStorage({ files, folders });
  };
  if (!user) {
    return <NoLogged />;
  }

  return (
    <div>
      <h1>Algolia Demo with Firebase!</h1>

      <UserLogged user={user} logout={logout} />
      <div>
        <Link href={"/example"}>
          <a>Go to example page</a>
        </Link>
      </div>
      <br />
      <Search />

      {error && <div>Failed to fetch!</div>}
      <Users users={data?.users} />
      <Files
        onGetFiles={onGetFiles}
        files={storage.files}
        folders={storage.folders}
      />
    </div>
  );
};

export default Index;
