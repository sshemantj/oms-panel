import { NextApiRequest, NextApiResponse } from "next";
import withSession from "@/lib/session";
import { axiosPublic } from "@/services/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req", req);
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const data = JSON.stringify({
        Username: username,
        Password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/users/authenticate",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      console.log("config", config);

      const authenticateResponse: any = await axiosPublic(config);

      console.log(authenticateResponse, "authenticateResponse authenticte");
      console.log("authenticateResponse.status", authenticateResponse.status);

      if (
        authenticateResponse.status === 200 &&
        (authenticateResponse.data.accessToken ||
          authenticateResponse.data ===
            "You must change your password before continuing.")
      ) {
        // Get user details
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `/users/GetByUsername?username=${username}`,
          headers: {},
        };

        try {
          const userResponse: any = await axiosPublic(config);
          console.log("userResponse cehck", userResponse);
          if (
            userResponse.status === 200 &&
            userResponse.data &&
            userResponse.data.userName
          ) {
            req.session.user = {
              accessToken: authenticateResponse.data.accessToken,
              id: userResponse.data.id || "",
              userName: userResponse.data.userName || "",
              email: userResponse.data.email || "",
              role: userResponse.data.role || "",
              storecode: userResponse.data.storecode || "",
              changePwdAtLogon: userResponse.data.changePwdAtLogon || false,
            };
            console.log(" req.session", req.session);

            await req.session.save();

            const isFirstTime =
              authenticateResponse.data ===
              "You must change your password before continuing.";

            return res.status(200).json({
              message: isFirstTime
                ? authenticateResponse.data
                : "Login Successfull",
              success: true,
              role: userResponse.data.role,
            });
          } else {
            return res.status(400).json({
              success: false,
            });
          }
        } catch (error: any) {
          return res
            .status(500)
            .json({ message: error.message, success: false });
        }
      } else {
        return res
          .status(200)
          .json({ message: authenticateResponse.data, success: false });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message, success: false });
    }
  }
}

export default withSession(handler);
