package back.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import back.model.Categoria;
import back.service.CategoriaService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping
    public List<Categoria> listarTodas() {
        return service.listarCategorias();
    }

    @PostMapping
    public ResponseEntity<Categoria> criarCategoria(@Valid @RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarCategoria(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizarCategoria(@PathVariable String id, @Valid @RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.OK).body(service.atualizarCategoria(Long.parseLong(id), categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCategoria(@PathVariable Long id) {
        service.deletarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}
