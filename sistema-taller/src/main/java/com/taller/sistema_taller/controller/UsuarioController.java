package com.taller.sistema_taller.controller;

import com.taller.sistema_taller.model.Usuario;
import com.taller.sistema_taller.service.user_service.UsuarioService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Endpoint: GET /api/usuarios
    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioService.obtenerTodos();
    }

    // Endpoint: GET /api/usuarios/{id}
    @GetMapping("/{id}")
    public Usuario obtenerPorId(@PathVariable Long id) {
        return usuarioService.obtenerPorId(id);
    }

    // Endpoint: POST /api/usuarios
    @PostMapping
    public void agregarUsuario(@RequestBody Usuario usuario) {
        usuarioService.agregarUsuario(usuario);
    }
}
