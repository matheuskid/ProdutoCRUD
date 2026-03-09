package back.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import back.model.Categoria;
import back.repository.CategoriaRepository;

@Service
public class CategoriaService {
    
    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> listarCategorias() {
        return repository.findAll();
    }
    
    public Categoria criarCategoria(Categoria categoria) {
        if (repository.existsByNome(categoria.getNome())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Categoria já existe!");   
        }
        return repository.save(categoria);
    }

    public Categoria atualizarCategoria(Long id, Categoria categoria) {
        if (repository.existsByNome(categoria.getNome())) { //Faz a verificação do nome a ser alterado antes de procurar a categoria, evitando uma consulta desnecessária
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Categoria já existe!");   
        }
        
        return repository.findById(id)
                .map(existingCategoria -> {
                    existingCategoria.setNome(categoria.getNome());
                    return repository.save(existingCategoria);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));
    }

    public void deletarCategoria(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!");
        }
        repository.deleteById(id);
    }

}
