package com.example.demo;

import com.example.demo.model.Movie;
import com.example.demo.repositories.MovieRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // Endpoint do pobierania wszystkich filmów
    @GetMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

//    // Endpoint do pobierania pojedynczego filmu po ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Movie> getMovie(@PathVariable Long id) {
//        Optional<Movie> movie = movieRepository.findById(id);
//        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

    // Endpoint do dodawania nowego filmu
    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Movie> addMovie(@Valid @RequestBody Movie movie) {
        Movie addedMovie = movieRepository.save(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedMovie);
    }

    // Endpoint do aktualizacji filmu po ID
    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @Valid @RequestBody Movie updatedMovie) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            Movie existingMovie = movie.get();
            existingMovie.setName(updatedMovie.getName());
            existingMovie.setDirector(updatedMovie.getDirector());
            existingMovie.setProducer(updatedMovie.getProducer());
            existingMovie.setRating(updatedMovie.getRating());
            existingMovie.setLength(updatedMovie.getLength());
            Movie updatedMovieResult = movieRepository.save(existingMovie);
            return ResponseEntity.ok(updatedMovieResult);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint do usuwania filmu po ID
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            movieRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
