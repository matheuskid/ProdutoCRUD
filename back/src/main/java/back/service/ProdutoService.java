package back.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import back.model.Produto;
import back.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public Produto criarProduto(Produto produto) {
        return produtoRepository.save(new Produto(produto.getNome(), produto.getPreco(), produto.getCategoria()));
    }

    public Produto atualizarProduto(Long id, Produto produto) {
        if (!produtoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!");
        }

        produto.setNome(produto.getNome());
        produto.setPreco(produto.getPreco());
        produto.setCategoria(produto.getCategoria());

        return produtoRepository.save(produto);
    }

    public void deletarProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!");
        }
        produtoRepository.deleteById(id);
    }
}
