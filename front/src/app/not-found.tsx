import Link from "next/link";

function NotFound () {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            404 - Página no encontrada
          </h1>
          <p className="mt-4 text-muted-foreground">
            Lo sentimos, la página que buscas no se encuentra.
          </p>
          <div className="mt-6">
            <Link
              href="#"
              className="inline-flex items-center btn-primary transition hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
}

export default NotFound;