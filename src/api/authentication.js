const BASE_URL = "http://fitnesstrac-kr.herokuapp.com/api";

const getUser = async (token, setUser) => {
  fetch("http://fitnesstrac-kr.herokuapp.com/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      setUser(result);
    })
    .catch(console.error);
};

const login = async (username, password, setToken, setError, navigate) => {
  await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      const token = result.token;
      setToken(token);
      localStorage.setItem("jwt", token);
      navigate("/");
    })
    .catch(console.error);
};

const registerUser = async (
  username,
  password,
  setToken,
  setError,
  navigate
) => {
  await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      const token = result.token;
      setToken(token);
      localStorage.setItem("jwt", token);
      navigate("/");
    })
    .catch(console.error);
};

export { registerUser, login, getUser };
