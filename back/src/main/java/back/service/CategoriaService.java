package back.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import back.model.Categoria;
import back.repository.CategoriaRepository;
import back.repository.ProdutoRepository;

@Service
public class CategoriaService {
    
    private final CategoriaRepository categoriaRepository;

    private final ProdutoRepository produtoRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, ProdutoRepository produtoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.produtoRepository = produtoRepository;
    }

    public Page<Categoria> listarCategorias(Pageable pageable) {
        return categoriaRepository.findAll(pageable);
    }
    
    public Categoria criarCategoria(Categoria categoria) {
        if (categoriaRepository.existsByNome(categoria.getNome())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Categoria já existe!");   
        }
        return categoriaRepository.save(categoria);
    }

    public Categoria atualizarCategoria(Long id, Categoria categoria) {
        if (categoriaRepository.existsByNome(categoria.getNome())) { // Faz a verificação antes de procurar a categoria, evitando uma consulta desnecessária
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Categoria já existe!");   
        }
        
        return categoriaRepository.findById(id)
                .map(existingCategoria -> {
                    existingCategoria.setNome(categoria.getNome());
                    return categoriaRepository.save(existingCategoria);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));
    }

    public void deletarCategoria(Long id) {
        if (!categoriaRepository.existsById(id)) { // Verifica se a categoria existe
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!");
        }
        if (produtoRepository.existsByCategoriaId(id)) { // Verifica se existem produtos vinculados a essa categoria
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Não é possível deletar esta categoria (produtos vinculados)");
        }
        categoriaRepository.deleteById(id);
    }

}
