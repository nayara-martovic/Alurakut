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
import Service from "../src/Services";

export default function Home() {
  const usuario = "nayara-martovic";
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  const [amigos, setAmigos] = React.useState([]);

  React.useEffect(() => {
    Service.fetchGithubFollowers(usuario).then((followers) =>
      setSeguidores(followers)
    );

    Service.fetchGithubFollowing(usuario).then(following => setAmigos(following));

    Service.fetchCommunities().then(communities => setComunidades(communities));
  }, []); // o array vazio indica q o codigo sera executado apenas uma vez

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar
            githubUser={usuario}
            userPhoto={`https://github.com/${usuario}.png`}
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
