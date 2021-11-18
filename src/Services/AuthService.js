import nookies from "nookies";
import jwt from "jsonwebtoken";

const BASE_URL = "https://alurakut.vercel.app";

class AuthService {
  login(userName) {
    return fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ githubUser: userName }),
    }).then(async (response) => {
      const data = await response.json();
      const token = data.token;

      this._saveUserToken(token);
      return token;
    });
  }

  logout() {
    nookies.destroy(null, "USER_TOKEN", {
      path: "/",
    });
  }

  async getAuth(context) {
    const cookies = nookies.get(context);
    const token = cookies.USER_TOKEN;

    const isAuthenticated = this._getIsAuthenticated(token);
    if (!isAuthenticated) return { isAuthenticated };

    const response = jwt.decode(token);
    if(!response) return { isAuthenticated: false };
    
    const { githubUser } = response;
    return {
      isAuthenticated,
      userName: githubUser,
    };
  }

  _getIsAuthenticated(token) {
    return fetch(`${BASE_URL}/api/auth`, {
      headers: {
        Authorization: token,
      },
    }).then(async (response) => {
      const data = await response.json();
      return data.isAuthenticated;
    });
  }

  _saveUserToken(token) {
    nookies.set(null, "USER_TOKEN", token, {
      path: "/",
      maxAge: 86400 * 7,
    });
  }
}

export default new AuthService();
