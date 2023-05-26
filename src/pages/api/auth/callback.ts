import axios from "axios";
import { CookieSerializeOptions, serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

type SpotifyAuthApiResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown
) => {
  try {
    const stringValue =
      typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

    const options: CookieSerializeOptions = {
      httpOnly: true,
      secure: true,
      path: "/",
    };

    res.setHeader("Set-Cookie", serialize(name, stringValue, options));
  } catch (error) {
    console.error(`Error setting cookie: ${error}`);
  }
};

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const code = req.query.code;
    const {
      SPOTIFY_REDIRECT_URI,
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET,
    } = process.env;
    const redirectUri = SPOTIFY_REDIRECT_URI ?? "";
    const clientId = SPOTIFY_CLIENT_ID ?? "";
    const clientSecret = SPOTIFY_CLIENT_SECRET ?? "";

    const params = new URLSearchParams({
      code: code as string,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const response = await axios.post<SpotifyAuthApiResponse>(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data.access_token) {
      setCookie(res, "spotify-token", response.data.access_token);
      res.status(200).redirect("/");
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default callback;
