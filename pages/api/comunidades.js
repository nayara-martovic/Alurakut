import { SiteClient } from "datocms-client";

export default async function ComunidadesService(req, res) {
  if (req.method === "POST") {
    const TOKEN = "ae86538654fbadde123d7e288cf440";
    const ModelId = "976012";
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: ModelId,
      ...req.body
    });

    res.json({
      mensagem: "Comunidade criada com sucesso!",
      data: record,
    });
  } else {
    res.status(404).json({
        mensagem: "Erro na requisição!"
    });
  }
}
