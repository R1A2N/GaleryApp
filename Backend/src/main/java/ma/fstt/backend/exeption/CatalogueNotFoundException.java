package ma.fstt.backend.exeption;

public class CatalogueNotFoundException extends Throwable {
    public CatalogueNotFoundException(String message) {
        super(message);
    }
}
