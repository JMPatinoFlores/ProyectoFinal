import Link from "next/link";

function Team() {
  return (
    <div className="w-full mb-10">
      <section className="py-12 md:py-24 lg:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Nuestro Equipo
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nuestro equipo de desarrollo está conformado por talentosos
              profesionales que trabajan en conjunto para crear soluciones
              innovadoras.
            </p>
          </div>
        </div>
      </section>
      <section className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3 lg:gap-8">
        <div className="flex flex-col items-center space-y-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Hernan Caceres</h3>
            <p className="text-muted-foreground">Back-end Developer</p>
            <div className="flex justify-center space-x-2 mt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              >
                <Link href="https://www.linkedin.com/in/hern%C3%A1n-dar%C3%ADo-c%C3%A1ceres-espitia/">
                  <img
                    src="./linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="transition hover:-translate-y-1 hover:scale-110 duration-300"
                  />
                </Link>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              ></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Farkin Coquil</h3>
            <p className="text-muted-foreground">Back-end Developer</p>
            <div className="flex justify-center space-x-2 mt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              >
                <Link href="https://www.linkedin.com/in/farkin-coquil-olivera-6a7019293/">
                  <img
                    src="./linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="transition hover:-translate-y-1 hover:scale-110 duration-300"
                  />
                </Link>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              ></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Bruno Champion</h3>
            <p className="text-muted-foreground">Back-end Developer</p>
            <div className="flex justify-center space-x-2 mt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              >
                <Link href="https://www.linkedin.com/in/bruno-champion-g%C3%A1lvez-427aba188/">
                  <img
                    src="./linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="transition hover:-translate-y-1 hover:scale-110 duration-300"
                  />
                </Link>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              ></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Santiago Giraldo</h3>
            <p className="text-muted-foreground">Front-end Developer</p>
            <div className="flex justify-center space-x-2 mt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              >
                <Link href="">
                  <img
                    src="./linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="transition hover:-translate-y-1 hover:scale-110 duration-300"
                  />
                </Link>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              ></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Jessica Patiño</h3>
            <p className="text-muted-foreground">Front-end Developer</p>
            <div className="flex justify-center space-x-2 mt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              >
                <Link href="https://www.linkedin.com/in/jessica-patino-flores/">
                  <img
                    src="./linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="transition hover:-translate-y-1 hover:scale-110 duration-300"
                  />
                </Link>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              ></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Esteban Romero</h3>
            <p className="text-muted-foreground">Front-end Developer</p>
            <div className="flex justify-center space-x-2 mt-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              >
                <Link href="https://www.linkedin.com/in/esteban-romero-b390251a8/">
                  <img
                    src="./linkedin.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="transition hover:-translate-y-1 hover:scale-110 duration-300"
                  />
                </Link>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
                prefetch={false}
              ></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
