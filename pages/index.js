import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.list.length})</h2>
      <ul>
        {props.list.map((item) => {
          return (
            <li key={item.id}>
              <a href={`${props.href}${item.title}`}>
                <img src={item.image} />
                <span>{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const usuario = 'nayara-martovic';
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);

  const amigos = [
    {
      title: 'SamukaM',
      image: 'https://github.com/SamukaM.png'
    },
    {
      title: 'omariosouto',
      image: 'https://github.com/omariosouto.png',
    },
    {
      title: 'juunegreiros',
      image: 'https://github.com/juunegreiros.png',
    },
    {
      title: 'peas',
      image: 'https://github.com/peas.png',
    },
    {
      title: 'rafaballerini',
      image: 'https://github.com/rafaballerini.png',
    }
    //'marcobrunodev','felipefialho',
  ];

  React.useEffect(() => {
    fetch('https://api.github.com/users/nayara-martovic/followers')
    .then(res => res.json())
    .then(res => {
      const jsonList = res.map(item => {
        return {
          title: item.login,
          image: item.avatar_url
        }
      });

      setSeguidores(jsonList);
    });
  }, []); // o array vazio indica q o codigo sera executado apenas uma vez

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuario} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(ev) {
                ev.preventDefault();
                const dadosDoForm = new FormData(ev.target);

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                }
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button type="submit">Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox 
            title="Meus Seguidores"
            list={seguidores}
            href="/followers/"
          />
          <ProfileRelationsBox 
            title="Meus Amigos"
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
  )
}
