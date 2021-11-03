const CommunityForm = ({ onSubmit }) => {
  const handleCriaComunidade = (ev) => {
    ev.preventDefault();

    const data = new FormData(ev.target);
    onSubmit({
      title: data.get("title"),
      imageUrl: data.get("image"),
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
