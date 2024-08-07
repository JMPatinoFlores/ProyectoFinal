import { Review } from "../Review";

export function PostReview() {
  return (
    <div>
      <h1>¿Cómo calificarías tu experiencia?</h1>
      <p>♥ ♥ ♥ ♥ ♥</p>
      <h2>Escribe tu opinión</h2>
      <Review />
      <button>Enviar</button>
    </div>
  );
}
