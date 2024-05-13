package com.example.demo.Instrumentostp.controller;

import com.example.demo.Instrumentostp.entities.Instrumento;
import com.example.demo.Instrumentostp.service.impl.InstrumentoServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/instrumento")
public class InstrumentoController extends BaseControllerImpl <Instrumento, InstrumentoServiceImpl> {
    private InstrumentoController(InstrumentoServiceImpl service) {
        super(service);
    }
}
