package com.example.demo.controllers;

import com.example.demo.models.Director;
import com.example.demo.other.ServiceResponse;
import com.example.demo.repositories.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/directors")
@CrossOrigin(origins = "http://localhost:4200")
public class DirectorController {
    private final DirectorRepository directorRepository;

    @Autowired
    public DirectorController(DirectorRepository directorRepository) {
        this.directorRepository = directorRepository;
    }

    @GetMapping
    public List<Director> getAllDirectors() {
        return directorRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Director> addDirector(@RequestBody Director director) {
        Director addedDirector = directorRepository.save(director);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedDirector);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Director> updateDirector(@PathVariable Long id, @RequestBody Director updatedDirector) {
        Optional<Director> director = directorRepository.findById(id);
        if (director.isPresent()) {
            Director existingDirector = director.get();
            existingDirector.setName(updatedDirector.getName());
            existingDirector.setNationality(updatedDirector.getNationality());
            existingDirector.setAge(updatedDirector.getAge());
            existingDirector.setMovies(updatedDirector.getMovies());
            Director updatedDirectorResult = directorRepository.save(existingDirector);
            return ResponseEntity.ok(updatedDirectorResult);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ServiceResponse<Void> deleteDirector(@PathVariable Long id) {
        Optional<Director> director = directorRepository.findById(id);
        if (director.isPresent()) {
            try {
                directorRepository.deleteById(id);
                return new ServiceResponse<>(null, true, "Author deleted");
            } catch (Exception e) {
                return new ServiceResponse<>(null, false, "Error during deleting author");
            }
        } else {
            return new ServiceResponse<>(null, false, "Reżysera nia ma w bazie");
        }
    }
}
