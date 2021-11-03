class UserService {
  fetchGithubUser(userName) {
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

  fetchGithubFollowers(userName) {
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

  fetchGithubFollowing(userName) {
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

  fetchCommunities() {
    return fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "bfa98b2226adb28aea9d378d36adc8",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title 
            imageUrl
            creatorSlug
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data.allCommunities);
  }
}

export default new UserService();
