const Authenticate = async (props) => {
  try {
    const user = await JSON.parse(localStorage.getItem("user"));
    console.log("got here!");

    if (!user) {
      console.log("user yes");
      props.setLoggedIn(true);
      return;
    }
    console.log("user nope");
    props.setLoggedIn(false);
    return;
  } catch {}

  props.setLoggedIn(false);
  return;
};

export default Authenticate();
