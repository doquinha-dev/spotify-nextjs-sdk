import type { GetServerSideProps, NextPage } from "next";


type Props = {
  token: string;
};

const Home: NextPage<Props> = ({ token }) => {
  console.log(token);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {token ? <span>{token}</span> : <span>Login</span>}
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