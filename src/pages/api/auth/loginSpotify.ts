import type { NextApiRequest, NextApiResponse } from "next";

const generateRandomString = (length: number): string => {
  let characters = "";
  const randomValues =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    characters += randomValues.charAt(Math.floor(Math.random() * randomValues.length));
  }
  return characters;
};

const loginSpotify = (req: NextApiRequest, res: NextApiResponse) => {
  const scope = "streaming user-read-email user-read-private";
  const {
    SPOTIFY_REDIRECT_URI,
    SPOTIFY_CLIENT_ID,
  } = process.env;
  const redirectUri = SPOTIFY_REDIRECT_URI ?? "";
  const clientId = SPOTIFY_CLIENT_ID ?? "";
  const state = generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" + authParams.toString()
  );
};

export default loginSpotify;
