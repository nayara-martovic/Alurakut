const CommunityForm = () => {
  const handleCriaComunidade = (ev) => {
    ev.preventDefault();
    const dadosDoForm = new FormData(ev.target);
    const corpo = {
      title: dadosDoForm.get("title"),
      imageUrl: dadosDoForm.get("image"),
      creatorSlug: "nayara-martovic",
    };

    fetch("/api/comunidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo),
    }).then(async (res) => {
      const dados = await res.json();
      // setComunidades([...comunidades, dados.data]);
    });
  };

  return (
    <form onSubmit={handleCriaComunidade}>
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
  );
};

export default CommunityForm;
