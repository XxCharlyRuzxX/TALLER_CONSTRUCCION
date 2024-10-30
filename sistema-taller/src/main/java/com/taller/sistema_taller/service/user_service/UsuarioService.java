package com.taller.sistema_taller.service.user_service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.taller.sistema_taller.model.Usuario;

@Service
public class UsuarioService {
    private final List<Usuario> usuarios = new ArrayList<>();

    public UsuarioService() {
        usuarios.add(new Usuario(1L, "Alice", "alice@example.com"));
        usuarios.add(new Usuario(2L, "Bob", "bob@example.com"));
    }

    public List<Usuario> obtenerTodos() {
        return usuarios;
    }

    public Usuario obtenerPorId(Long id) {
        return usuarios.stream()
                .filter(usuario -> usuario.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public void agregarUsuario(Usuario usuario) {
        usuarios.add(usuario);
    }
}

