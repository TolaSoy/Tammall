export default function({ store, route, redirect }) {
  const user = store.state.users.user
  if (!user) {
    redirect("/auth/login");
  }
  // if (user && route.path === "/auth/login") {
  //   console.log("!klkdl", user)
  //   redirect("/");
  // }
}
