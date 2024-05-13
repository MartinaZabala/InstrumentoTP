package com.example.demo.Instrumentostp.entities;

import com.example.demo.Instrumentostp.entities.Enum.Categorias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name= "categoriaInstrumento")
public class CategoriaInstrumento extends Base{
    @Enumerated(EnumType.STRING)
    private Categorias denominacion;

    @JsonIgnore // Evita la serialización de la relación para evitar recursión infinita
    @OneToMany(mappedBy = "categoriaInstrumento", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("categoria")
    @Builder.Default // Inicializa la lista con un ArrayList vacío
    private List<Instrumento> instrumentos = new ArrayList<>();
}
