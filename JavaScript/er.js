
    // Função para carregar e exibir posts do localStorage
    function carregarPosts() {
        const article = document.querySelector('article');
        if (!article) {
            console.error('❌ Article não encontrado');
            return;
        }
        
        try {
            const postsData = localStorage.getItem('postsER');
            console.log('📦 Dados brutos do localStorage:', postsData);
            
            const posts = postsData ? JSON.parse(postsData) : [];
            console.log('📝 Posts para exibir:', posts);
            
            // Limpar posts dinâmicos existentes
            const postsDinamicos = article.querySelectorAll('.post-dinamico');
            postsDinamicos.forEach(post => post.remove());
            console.log('🗑️ Posts dinâmicos removidos:', postsDinamicos.length);
            
            // Adicionar novos posts
            if (posts.length > 0) {
                console.log('🎨 Adicionando', posts.length, 'posts...');
                posts.forEach((post, index) => {
                    const postElement = criarElementoPost(post);
                    // Inserir no início do article (acima dos posts fixos)
                    article.insertBefore(postElement, article.firstChild);
                    console.log('✅ Post', index, 'adicionado:', post.titulo);
                });
            } else {
                console.log('ℹ️ Nenhum post para exibir');
            }
            
        } catch (error) {
            console.error('❌ Erro ao carregar posts:', error);
        }
    }

    // Função para criar elemento HTML do post
    function criarElementoPost(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'publicações post-dinamico';
        
        const imagemSrc = post.imagem ? post.imagem : 'img/ER_Achievement-Trophy_Roundtable_Hold.webp';
        
        postDiv.innerHTML = `
            <div class="imagem-publicaçoes">
                <img src="${imagemSrc}" alt="${post.titulo}">
            </div>
            <div class="publicações1">
                <h2>${post.titulo}</h2>
                <div class="content">
                    <details>
                        <summary><h4>Como Obter:</h4></summary>
                        <p>${post.conteudo}
                                ${post.link}</p>

                        <small style="color: #888; font-size: 12px; display: block; margin-top: 10px;">Postado em: ${post.data}</small>
                    </details>
                    <div class="negocios">
                        <img src="img/acima.png" alt="Like" class="btn-like">
                        <img src="img/bate-papo.png" alt="Comentarios" class="btn-comentario">
                        <img src="img/marca-paginas.png" alt="salvar" class="btn-salvar">
                    </div>
                </div>
            </div>
            <div class="opçoes">
  <img src="img/tres-pontos.png" alt="3 pontos" onclick="toggleOpcoes(event)">
  <div class="menu-opc">
    <p onclick="editarPost(${post.id})">Editar</p>
    <p onclick="excluirPost(${post.id})">Excluir</p>
  </div>
</div>
        `;
        
        return postDiv;
    }

    // Carregar posts quando a página carregar
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Página ER carregada - iniciando carregamento de posts');
        console.log('🔍 Verificando localStorage...');
        console.log('📋 postsER no localStorage:', localStorage.getItem('postsER'));
        carregarPosts();
    });

    // Recarregar posts quando a página for mostrada (voltar de outras páginas)
    window.addEventListener('pageshow', function(event) {
        console.log('🔄 Evento pageshow - recarregando posts');
        carregarPosts();
    });

    // Recarregar quando a página ganhar foco
    window.addEventListener('focus', function() {
        console.log('👀 Página em foco - verificando posts');
        carregarPosts();
    });
