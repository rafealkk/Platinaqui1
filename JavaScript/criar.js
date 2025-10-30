document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-post");
  const tituloInput = document.getElementById("campo-titulo");
  const conteudoInput = document.getElementById("campo-conteudo");
  const imagemInput = document.getElementById("multimidia");
  const linkInput = document.getElementById("link");
  const previewContainer = document.getElementById("preview-container");

  // Função para mostrar preview da imagem
  const atualizarPreview = (file) => {
    if (!file) {
      previewContainer.innerHTML = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      previewContainer.innerHTML = `<img src="${e.target.result}" style="max-width:150px; border-radius:8px;">`;
    };
    reader.readAsDataURL(file);
  };

  // Evento de mudança no input de imagem
  imagemInput.addEventListener("change", (e) => atualizarPreview(e.target.files[0]));

  // Função para salvar post no localStorage
  const salvarPost = ({ id, titulo, conteudo, link, imagem, data }) => {
    const postsExistentes = JSON.parse(localStorage.getItem("postsER")) || [];
    postsExistentes.push({ id, titulo, conteudo, link, imagem, data });
    localStorage.setItem("postsER", JSON.stringify(postsExistentes));
    alert("Conquista publicada com sucesso!");
    window.location.href = "ER.html";
  };

  // Envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = tituloInput.value.trim();
    const conteudo = conteudoInput.value.trim();
    const link = linkInput.value.trim();
    const data = new Date().toLocaleString("pt-BR");
    const id = Date.now(); // ID único

    if (!titulo || !conteudo) {
      alert("Título e conteúdo são obrigatórios!");
      return;
    }

    const file = imagemInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        salvarPost({ id, titulo, conteudo, link, imagem: ev.target.result, data });
      };
      reader.readAsDataURL(file);
    } else {
      salvarPost({ id, titulo, conteudo, link, imagem: "", data });
    }
  });
});
