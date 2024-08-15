import Image from "next/image";
import Link from "next/link";

function Team() {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-10">
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
        {[
          {
            name: "Hernan Caceres",
            role: "Back-end Developer",
            linkedin:
              "https://www.linkedin.com/in/hern%C3%A1n-dar%C3%ADo-c%C3%A1ceres-espitia/",
          },
          {
            name: "Farkin Coquil",
            role: "Back-end Developer",
            linkedin:
              "https://www.linkedin.com/in/farkin-coquil-olivera-6a7019293/",
          },
          {
            name: "Bruno Champion",
            role: "Back-end Developer",
            linkedin:
              "https://www.linkedin.com/in/bruno-champion-g%C3%A1lvez-427aba188/",
          },
          {
            name: "Santiago Giraldo",
            role: "Front-end Developer",
            linkedin: "https://www.linkedin.com/in/santiagogiraldoe/",
          },
          {
            name: "Jessica Patiño",
            role: "Front-end Developer",
            linkedin: "https://www.linkedin.com/in/jessica-patino-flores/",
          },
          {
            name: "Esteban Romero",
            role: "Front-end Developer",
            linkedin: "https://www.linkedin.com/in/esteban-romero-b390251a8/",
          },
        ].map((member, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
              <div className="flex justify-center space-x-2 mt-2">
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    className="text-muted-foreground hover:text-primary"
                    prefetch={false}
                  >
                    <Image
                      src="./linkedin.svg"
                      alt="LinkedIn"
                      width={16}
                      height={16}
                      className="transition hover:-translate-y-1 hover:scale-110 duration-300"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Team;
