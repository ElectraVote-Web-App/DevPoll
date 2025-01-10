export default function AboutPage() {
  return (
    <div className="mx-auto w-full min-w-0">
      <div className="mb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Introduction
        </h1>
        <p className="pt-1 text-lg text-muted-foreground">
          DevPoll est une plateforme de vote et de sondage en ligne conçue pour
          offrir un environnement sécurisé et convivial permettant de créer,
          participer et gérer des sondages. Cette plateforme a été développée
          par <strong className="font-semibold">Chabani Walid</strong>,{" "}
          <strong className="font-semibold">El-Amrani Youssef</strong> et{" "}
          <strong className="font-semibold">Makhlouk Anass</strong>, mettant
          l&apos;accent sur les résultats en temps réel et les sessions de vote
          limitées dans le temps afin d’améliorer l’expérience utilisateur et la
          fiabilité du système.
        </p>
      </div>
      <div className="docs-content">
        <h2
          id="Objectif"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors [&:not(:first-child)]:mt-10"
        >
          <a href="#motivations">Objectif</a>
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          L&apos;objectif principal de DevPoll est de créer une plateforme
          sécurisée où les utilisateurs peuvent s&apos;inscrire, voter pour des
          candidats ou participer à des sondages, et consulter les résultats en
          temps réel. Le système inclut une gestion avancée des erreurs et
          termine automatiquement les sessions de vote après une durée
          prédéfinie.
        </p>
        <h2
          id="features"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors [&amp;:not(:first-child)]:mt-10"
        >
          <a href="#features">Fonctionnalités principales</a>
        </h2>
        <ul className="ml-6 list-disc [&:not(:first-child)]:mt-6 [&:not(:last-child)]:mb-6 [&>li:not(:first-child)]:mt-2">
          <li className="[&>ol]:!mt-2 [&>ul]:!mt-2">
            Inscription et
            <strong className="font-semibold"> authentification.</strong>
          </li>
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">
            Création de
            <strong className="font-semibold"> sondages</strong>.
          </li>
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">
            Participation aux
            <strong className="font-semibold"> sondages.</strong>
          </li>
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">
            Résultats en temps réel
          </li>
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">
            Clôture automatique
          </li>
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">Notifications</li>
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">
            Gestion des erreurs
          </li>
        </ul>
        <h2
          id="credits"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors [&amp;:not(:first-child)]:mt-10"
        >
          Technologies utilisées
        </h2>
        <ul className="ml-6 sm:flex sm:flex-row  gap-y-4 sm:gap-y-0 flex-col justify-evenly items-center [&amp;:not(:first-child)]:mt-6 [&amp;:not(:last-child)]:mb-6 [&amp;>li:not(:first-child)]:mt-2">
          <li>
            <img className="h-12" src="./nodejs.png" />
          </li>
          <li>
            <img className="h-12" src="./Expressjs.png" />
          </li>
          <li>
            <img className="h-12" src="./react.png" />
          </li>
          <li>
            <img className="h-12" src="./Mysql.png" />
          </li>
        </ul>
        <h2
          id="credits"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors [&amp;:not(:first-child)]:mt-10"
        >
          Packages utilisés
        </h2>
        <ul className="ml-6 list-disc [&amp;:not(:first-child)]:mt-6 [&amp;:not(:last-child)]:mb-6 [&amp;>li:not(:first-child)]:mt-2">
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">
            <strong className="font-semibold">Backend</strong> :
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              sequelize
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              mysql2
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              jsonwebtoken
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              bcryptjs
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              cors
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              faker
            </code>
          </li>
          <li className="[&amp;>ol]:!mt-2 [&amp;>ul]:!mt-2">
            <strong className="font-semibold">Frontend</strong> :
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              axios
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              react-router-dom
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              react-hook-form
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              framer-motion
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              zod
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              lucid-react
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              radix
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              shadcn
            </code>{" "}
            <code
              className="inline-code relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono"
              data-v-7413e23b=""
            >
              tailwindcss
            </code>
          </li>
        </ul>
        <h2
          id="license"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors [&amp;:not(:first-child)]:mt-10"
        >
          Conclusion
        </h2>
        <p className="leading-7 [&amp;:not(:first-child)]:mt-6">
          DevPoll est une plateforme robuste et sécurisée conçue pour offrir une
          expérience fluide de vote et de sondage. Avec son interface intuitive,
          ses fonctionnalités en temps réel et son accent sur la sécurité,
          DevPoll simplifie la création et la gestion des sondages en ligne.
        </p>
      </div>
      <div className="mt-16">
        <div className="mb-6 w-fit">
          <a
            href="https://github.com/ZTL-UwU/shadcn-docs-nuxt/edit/main/content/1.getting-started/1.introduction.md"
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm font-semibold text-primary"
          >
            <div className="flex items-center gap-2">
              <span
                className="iconify i-lucide:square-pen"
                aria-hidden="true"
              ></span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
