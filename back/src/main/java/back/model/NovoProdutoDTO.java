package back.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NovoProdutoDTO {

    @JsonProperty("nome")
    private String nome;

    @JsonProperty("preco")
    private BigDecimal preco;

    @JsonProperty("categoriaId")
    private Long categoriaId;

    public NovoProdutoDTO() {}
    
    public void setNome(String nome) { this.nome = nome; }
    
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    
    public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }

    public String getNome() { return nome; }

    public BigDecimal getPreco() { return preco; }

    public Long getCategoriaId() { return categoriaId; }
}