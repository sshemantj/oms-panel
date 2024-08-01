import withSession from "@/lib/session";

async function userRoute(req: any, res: any) {
  if (req.session.user) {
    // to get more information on the user if needed
    const { user } = req.session;

    res.json({
      storecode: user.storecode || "",
      id: user.id || "",
      userName: user.userName || "",
      email: user.email || "",
      role: user.role || "",
      success: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      user: {},
    });
  }
}
export default withSession(userRoute);
