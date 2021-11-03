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

export default function Home(props) {
  const [user, setUser] = React.useState({ userName: props.userName, name: "", imageUrl: "" });
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  const [amigos, setAmigos] = React.useState([]);

  React.useEffect(() => {
    UserService.fetchGithubUser(user.userName).then(userData => setUser(userData));

    UserService.fetchGithubFollowers(user.userName).then((followers) =>
      setSeguidores(followers)
    );

    UserService.fetchGithubFollowing(user.userName).then(following => setAmigos(following));

    UserService.fetchCommunities().then(communities => setComunidades(communities));
  }, []); // o array vazio indica q o codigo sera executado apenas uma vez

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar
            user={user}
          />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <CommunityForm />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox
            title="Seguidores"
            list={seguidores}
            href="/followers/"
          />
          <ProfileRelationsBox
            title="Seguindo"
            list={amigos}
            href="/users/"
          />
          <ProfileRelationsBox
            title="Minhas Comunidades"
            list={comunidades}
            href="/communities/"
          />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const { isAuthenticated, userName } = await AuthService.getAuth(context);

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {
      userName
    }, // will be passed to the page component as props
  }
}