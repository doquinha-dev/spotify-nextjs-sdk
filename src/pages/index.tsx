import { LoginButton } from "@/components/LoginButton";
import type { GetServerSideProps, NextPage } from "next";


type Props = {
  token: string;
};

const Home: NextPage<Props> = ({ token }) => {
  console.log(token);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-24">
      {token ? <span className="text-white">{token}</span> : <LoginButton/>}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const token: string = context.req.cookies["spotify-token"] ?? "";

  return {
    props: { token },
  };
};

export default Home;