package back.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import back.model.Categoria;
import back.model.Produto;
import back.model.NovoProdutoDTO;
import back.repository.CategoriaRepository;
import back.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public Produto criarProduto(NovoProdutoDTO novoProduto) {
        Categoria categoria = categoriaRepository
            .findById(Long.valueOf(novoProduto.getCategoriaId()))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));

        return produtoRepository.save(new Produto(novoProduto.getNome(), novoProduto.getPreco(), categoria));
    }

    public Produto atualizarProduto(Long id, NovoProdutoDTO novoProduto) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        Categoria categoria = categoriaRepository
            .findById(Long.valueOf(novoProduto.getCategoriaId()))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));

        produto.setNome(novoProduto.getNome());
        produto.setPreco(novoProduto.getPreco());
        produto.setCategoria(categoria);

        return produtoRepository.save(produto);
    }

    public void deletarProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!");
        }
        produtoRepository.deleteById(id);
    }
}
