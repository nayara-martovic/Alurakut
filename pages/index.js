import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import ProfileRelationsBox from "../src/components/ProfileRelations";
import ProfileSidebar from "../src/components/ProfileSidebar";
import CommunityForm from "../src/components/CommunityForm";
import UserService from "../src/Services/UserService";
import AuthService from "../src/Services/AuthService";
import CommunityService from "../src/Services/CommunityService";

export default function Home(props) {
  const [user, setUser] = React.useState({
    userName: props.userName,
    name: "",
    imageUrl: "",
  });
  const [communities, setCommunities] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);

  React.useEffect(() => {
    UserService.getGithubUser(user.userName).then((userData) =>
      setUser(userData)
    );

    UserService.getGithubFollowers(user.userName).then((followersData) =>
      setFollowers(followersData)
    );

    UserService.getGithubFollowing(user.userName).then((followingData) =>
      setFollowing(followingData)
    );

    CommunityService.getAll().then((communitiesData) =>
      setCommunities(communitiesData)
    );
  }, []); // o array vazio indica q o codigo sera executado apenas uma vez

  const handleSubmitCommunityForm = (data) => {
    data.creatorSlug = user.userName;

    CommunityService.create(data).then((createdCommunity) => {
      setComunidades([...comunidades, createdCommunity]);
    });
  };

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar user={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <CommunityForm onSubmit={handleSubmitCommunityForm} />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox
            title="Seguidores"
            list={followers}
            href="/followers/"
            hrefContinue={`https://github.com/${user.userName}?tab=followers`}
          />
          <ProfileRelationsBox
            title="Seguindo"
            list={following}
            href="/following/"
            hrefContinue={`https://github.com/${user.userName}?tab=following`}
          />
          <ProfileRelationsBox
            title="Minhas Comunidades"
            list={communities}
            href="/communities/"
          />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const { isAuthenticated, userName } = await AuthService.getAuth(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userName,
    }, // will be passed to the page component as props
  };
}
