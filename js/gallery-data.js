/*
  DADOS DA GALERIA — Filhos do Gui
  ---------------------------------
  Edite este arquivo para adicionar as fotos reais recebidas da equipe
  do deputado Guilherme Cortez.

  Cada item precisa de:
  - src: caminho da imagem (coloque os arquivos em /img/galeria/)
  - caption: legenda curta que aparece no hover e no lightbox
  - category: uma das categorias usadas nos filtros:
      "eventos"    -> eventos, solenidades, inaugurações
      "gabinete"   -> fotos no gabinete, reuniões internas
      "rua"        -> visitas, caminhadas, contato com eleitores
      "assembleia" -> sessões e atividades na Assembleia Legislativa

  Exemplo de como adicionar uma foto nova:
  {
    src: "img/galeria/inauguracao-escola.jpg",
    caption: "Inauguração da reforma da Escola Municipal X",
    category: "eventos"
  },
*/

const galleryData = [
  { src: "img/galeria/foto-01.jpg", caption: "Visita à comunidade local", category: "rua" },
  { src: "img/galeria/foto-02.jpg", caption: "Sessão na Assembleia Legislativa", category: "assembleia" },
  { src: "img/galeria/foto-03.jpg", caption: "Parada do Orgulho LGBT", category: "eventos" },
  { src: "img/galeria/foto-04.jpg", caption: "Pré Candidatura a Deputado Federal", category: "rua" },
  { src: "img/galeria/foto-05.jpg", caption: "Pose na Alesp!", category: "assembleia" },
  { src: "img/galeria/foto-06.jpg", caption: "Saindo da Alesp...", category: "assembleia" },
  { src: "img/galeria/foto-07.jpg", caption: "Falando com meus filhos!", category: "rua" }
];
