import { INestApplication, ValidationPipe } from '@nestjs/common';

// Wspólne ustawienia aplikacji – używane w main.ts i w testach e2e,
// żeby testy sprawdzały dokładnie tę samą konfigurację co prawdziwy serwer.
export function configureApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      // Usuwa z zapytania pola, których nie ma w DTO.
      whitelist: true,
      // ...a zamiast po cichu usuwać, odrzuca zapytanie z błędem 400.
      forbidNonWhitelisted: true,
      // Zamienia JSON na instancję klasy DTO (potrzebne m.in. do @Transform).
      transform: true,
    }),
  );
  // Front (Vite) działa na innym porcie, więc przeglądarka wymaga zgody serwera (CORS).
  app.enableCors({ origin: 'http://localhost:5173' });
}
