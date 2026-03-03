package back.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
    
}
