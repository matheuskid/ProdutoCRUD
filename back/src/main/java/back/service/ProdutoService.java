package back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import back.model.Produto;
import back.repository.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<Produto> listarProdutos() {
        return repository.findAll();
    }

    public void deletarProduto(Long id) {
        repository.deleteById(id);
    }
}
