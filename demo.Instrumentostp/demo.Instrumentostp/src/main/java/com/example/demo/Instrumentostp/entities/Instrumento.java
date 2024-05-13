package com.example.demo.Instrumentostp.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="instrumento")
public class Instrumento extends Base {

    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private double precio;
    private String costoEnvio;
    private int cantidadVendida;
    @Lob
    private String descripcion;
    @ManyToOne
    @JoinColumn(name = "categoriaInstrumento_id")
    @JsonIgnoreProperties("instrumentos")
    private CategoriaInstrumento categoriaInstrumento;


}
