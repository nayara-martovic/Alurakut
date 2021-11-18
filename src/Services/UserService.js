class UserService {
  getGithubUser(userName) {
    return fetch(`https://api.github.com/users/${userName}`)
      .then((res) => res.json())
      .then((res) => {
        return {
          userName: res.login,
          name: res.name,
          imageUrl: res.avatar_url,
        };
      });
  }

  getGithubFollowers(userName) {
    return fetch(`https://api.github.com/users/${userName}/followers`)
      .then((res) => res.json())
      .then((res) => {
        const jsonList = res.map((item) => ({
          id: item.login,
          title: item.login,
          imageUrl: item.avatar_url,
        }));

        return jsonList;
      });
  }

  getGithubFollowing(userName) {
    return fetch(`https://api.github.com/users/${userName}/following`)
      .then((res) => res.json())
      .then((res) => {
        const jsonList = res.map((item) => ({
          id: item.login,
          title: item.login,
          imageUrl: item.avatar_url,
        }));

        return jsonList;
      });
  }
}

export default new UserService();
