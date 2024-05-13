package com.example.demo.Instrumentostp.service.impl;

import com.example.demo.Instrumentostp.entities.Instrumento;
import com.example.demo.Instrumentostp.repository.BaseRepository;
import com.example.demo.Instrumentostp.repository.CategoriaInstrumentoRepository;
import com.example.demo.Instrumentostp.repository.InstrumentoRepository;
import com.example.demo.Instrumentostp.service.BaseServiceImpl;
import com.example.demo.Instrumentostp.service.InstrumentoService;
import org.springframework.stereotype.Service;

@Service
public class InstrumentoServiceImpl extends BaseServiceImpl<Instrumento, Long> implements InstrumentoService {

    private InstrumentoRepository instrumentoRepository;
    public InstrumentoServiceImpl(InstrumentoRepository instrumentoRepository, CategoriaInstrumentoRepository categoriaInstrumentoRepository) {
        super((BaseRepository<Instrumento, Long>) instrumentoRepository);
        this.instrumentoRepository = instrumentoRepository;
    }

}