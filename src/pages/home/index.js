import React, { useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import styled from "styled-components";
import { timelineBlocks } from "../../components/common/DataList";
import { config } from "../../firebase";
import Countdown from "../../components/Countdown";
import { Button } from "../../components/form";
import { Image } from "../../components/common/Image";
import { PreviewCarousel } from "./PreviewCarousel";
import { NewsCarousel } from "./NewsCarousel";
import { ContactForm } from "./ContactForm";
import orderBy from "lodash/orderBy";

const news = [
  {
    imageUrl: `${config.storageUrl}/resources/news-1.jpg`,
    title: "Por un Perú Digital",
    description:
      "Más de 30 organizaciones civiles, académicas y empresariales hacemos un llamado para priorizar acciones específicas de una agenda digital que permita construir un Perú digital como eje fundamental de la agenda pública en cumplimiento de la Politica 35 del Acuerdo Nacional.",
  },
  {
    imageUrl: `${config.storageUrl}/resources/news-2.jpg`,
    title: "Red Dorsal Nacional de Fibra Óptica",
    description:
      "COMUNICADO TDD-COM-2021-02 Propuesta base para la gestión y operación de la Red Dorsal Nacional de Fibra Óptica y las Redes Regionales de Fibra Óptica La conectividad es una de las bases para un auténtico desarrollo con inclusión.",
  },
  {
    imageUrl: `${config.storageUrl}/resources/news-3.jpg`,
    title: "Transformación Digital del Perú con Inclusión",
    description:
      "La pandemia del COVID ha puesto en evidencia las carencias estructurales de nuestro país, pero además ha revelado la profunda BRECHA DIGITAL en nuestra sociedad, la cual es una consecuencia del proceso global de Transformación Digital que afecta las actividades económicas, sociales, e incluso políticas de todos los países.",
  },
  {
    imageUrl: `${config.storageUrl}/resources/news-4.jpg`,
    title: "Lineamientos para la Transformación Digital del Perú",
    description:
      "El cambio acelerado mundial motivado principalmente por el crecimiento exponencial de las Tecnologías Digitales TD está presente en nuestra sociedad desde hace ya algunos años, pero se ha hecho más evidente con la pandemia del COVID.",
  },
];

export const Home = (props) => {
  const router = useRouter();

  const [authUser] = useGlobal("user");

  const [exhibitors, setExhibitors] = useState([]);

  useEffect(() => {
    router.prefetch("/buy-tickets");
    router.prefetch("/library");
    router.prefetch("/library/events");
    router.prefetch("/events/[eventId]");
  }, []);

  useEffect(() => {
    const _exhibitors = [];

    timelineBlocks.map((block) => _exhibitors.push(...block.exhibitors));

    const sortedExhibitors = orderBy(_exhibitors, ["name"], ["asc"]);

    setExhibitors(sortedExhibitors);
  }, []);

  return (
    <LandingContainer>
      <div className="min-h-[calc(100vh-50px)] lg:min-h-[calc(100vh-120px)] w-full bg-index bg-no-repeat bg-cover flex lg:items-end bg-bottom">
        <div className="mt-8 lg:mt-0 lg:mx-12 lg:grid lg:grid-cols-3 w-[90%] lg:w-full lg:h-[500px]">
          <div className="col-start-1 col-end-2 bg-white/[.60] max-w-[500px] p-4 lg:p-8">
            <h2 className="text-xl lg:text-4xl font-bold mb-6">I CONGRESO INTERNACIONAL DE TRANSFORMACIÓN DIGITAL</h2>

            <p className="text-base lg:text-xl mb-8">Hacia un desarrollo digital sostenible e inclusivo.</p>

            <Button margin="m-0" primary onClick={() => router.push(authUser ? "/buy-tickets" : "/register")}>
              Adquirir entrada
            </Button>
          </div>
        </div>
      </div>

      <Countdown />

      <div className="bg-white pt-24 mb-32">
        <div className="text-center text-xl lg:text-4xl font-bold pt-4 mb-8">¿Quiénes somos?</div>

        <div className="bg-black text-white py-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:px-20">
          <div className="px-10 py-4 max-w-[500px] mx-auto">
            <Image src={`${config.storageUrl}/resources/logo-tdd-utp-vector-white.svg`} />
          </div>
          <div className="px-10">
            <p className="mb-8 text-base lg:text-2xl text-right">
              El Instituto Transformación Digital para el Desarrollo (TDD) Nace con el fin de promover la adopción e
              impulsar el uso intensivo, eficaz, eficiente y extendido de las Tecnologías Digitales y de esta manera
              coadyuvar al desarrollo del país, con acciones de todos los estamentos de nuestra sociedad: gobierno,
              empresa, academia y sociedad civil, con un claro liderazgo del Estado por medio de Políticas Públicas
              Digitales efectivas y el desarrollo de la institucionalidad apropiada a tal reto, que contribuyan a
              superar los grandes problemas nacionales enmarcados en una visión de desarrollo compartida.
            </p>
            <div className="text-right">
              <Button primary margin="m-0" onClick={() => {}}>
                Ir al TDD
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 md:py-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center text-xl lg:text-4xl font-bold pt-4 mb-8">Expositores</div>

          <PreviewCarousel items={exhibitors} />
        </div>
      </div>

      <div className="bg-white py-4 mb-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center text-xl lg:text-4xl font-bold pt-4 mb-8">Noticias de Interés</div>

          <NewsCarousel items={news} />
        </div>
      </div>

      <div className="bg-white py-4 mb-48">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-xl lg:text-4xl font-bold pt-4 mb-8 mx-4">Información de contacto</div>
          <div className="text-base lg:text-xl pt-4 mb-8 mx-4">
            Si desea información acerca de la feria, por favor envie su solicitud al correo{" "}
            <span className="font-bold">congreso@tdduni.org</span>
          </div>

          <ContactForm {...props} />
        </div>
      </div>
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  font-family: "Encode Sans", sans-serif;
`;
