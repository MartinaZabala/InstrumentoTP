package com.example.demo.Instrumentostp.controller;

import com.example.demo.Instrumentostp.entities.CategoriaInstrumento;
import com.example.demo.Instrumentostp.service.impl.CategoriaInstrumentoServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/instrumentoCategoria")
public class CategoriaInstrumentoController extends BaseControllerImpl <CategoriaInstrumento, CategoriaInstrumentoServiceImpl> {
    private CategoriaInstrumentoController(CategoriaInstrumentoServiceImpl service) {
        super(service);
    }
}
