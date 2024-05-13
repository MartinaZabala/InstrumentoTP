package com.example.demo.Instrumentostp.service.impl;

import com.example.demo.Instrumentostp.entities.CategoriaInstrumento;
import com.example.demo.Instrumentostp.repository.BaseRepository;
import com.example.demo.Instrumentostp.repository.CategoriaInstrumentoRepository;
import com.example.demo.Instrumentostp.service.BaseServiceImpl;
import com.example.demo.Instrumentostp.service.CategoriaInstrumentoService;
import org.springframework.stereotype.Service;

@Service
public class CategoriaInstrumentoServiceImpl extends BaseServiceImpl<CategoriaInstrumento, Long> implements CategoriaInstrumentoService {
    private CategoriaInstrumentoRepository categoriaInstrumentoRepository;
    public CategoriaInstrumentoServiceImpl(CategoriaInstrumentoRepository CategoriaInstrumentoRepository){
        super((BaseRepository<CategoriaInstrumento, Long>) CategoriaInstrumentoRepository);
        this.categoriaInstrumentoRepository = categoriaInstrumentoRepository;
    }

}