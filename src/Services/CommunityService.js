class CommunityService {
  create(data) {
    return fetch("/api/comunidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res.data);
  }

  getAll() {
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

export default new CommunityService();
