import { config } from "../../firebase";
import { darkTheme } from "../../theme";

export const avatars = [
  `${config.storageUrl}/resources/avatars/dog.svg`,
  `${config.storageUrl}/resources/avatars/fox.svg`,
  `${config.storageUrl}/resources/avatars/deer.svg`,
  `${config.storageUrl}/resources/avatars/cat.svg`,
  `${config.storageUrl}/resources/avatars/cow.svg`,
  `${config.storageUrl}/resources/avatars/pig.svg`,
  `${config.storageUrl}/resources/avatars/monkey.svg`,
  `${config.storageUrl}/resources/avatars/chicken.svg`,
  `${config.storageUrl}/resources/avatars/panda.svg`,
];

export const adminMenus = [
  {
    value: "home",
    url: "/home",
  },
  {
    value: "users",
    url: "/admin/users",
  },
  {
    value: "manifests",
    url: "/admin/settings/manifests",
  },
  {
    value: "templates",
    url: "/admin/settings/templates",
  },
  {
    value: "seo",
    url: "/admin/seo",
  },
];

export const menus = [
  /*
  {
    name: "Reportes",
    url: "/reports",
    src: `${config.storageUrl}/resources/footer/reports-icon.svg`,
  },
   */
  {
    name: "Lista de usuarios",
    url: "/admin/users",
    isAdmin: true,
  },
  {
    name: "Lista de cupónes",
    url: "/admin/coupons",
    isAdmin: true,
  },
  {
    name: "Lista de emails",
    url: "/admin/emails",
    isAdmin: true,
  },
];

export const emailTemplates = [
  {
    id: "newAccount",
    name: "Nuevo usuario",
    to: "user",
  },
  {
    id: "verifyCode",
    name: "Codigo de Verificación para nuevo usuario",
    to: "user",
  },
];

export const templatesLegend = [
  { name: "userName", value: "Nombre del usuario" },
  { name: "userEmail", value: "Email del usuario" },
  { name: "userNickname", value: "Nickname del usuario" },
  { name: "userImage", value: "Imagen del usuario" },
  { name: "secondUserName", value: "Nombre del segundo usuario" },
  { name: "secondUserEmail", value: "Email del segundo usuario" },
  { name: "secondUserNickname", value: "Nickname del segundo usuario" },
  { name: "secondUserImage", value: "Imagen del segundo usuario" },
  { name: "amount", value: "Monto" },
  { name: "additionalAmount", value: "Monto Adicional" },
  { name: "documentType", value: "Tipo de documento" },
  { name: "documentNumber", value: "Numero de documento" },
  { name: "accountNumber", value: "Numero de cuenta" },
  { name: "expiredDate", value: "Dia de expiración" },
  { name: "message", value: "Mensaje del formulario de contacto" },
  {
    name: "companyEmail",
    value: "Email de la compañia del formulariode contacto",
  },
  {
    name: "companyPhone",
    value: "Telefono de la compañia del formulario de contacto",
  },
  { name: "link", value: "Link" },
  { name: "verifyAccountLink", value: "Link de verificación" },
  { name: "code", value: "Verification code" },
];

export const timelineBlocks = [
  {
    name: "Bloque 1",
    date: "Miércoles 8, 6:00 - 9:00 PM",
    title: "Políticas Públicas",
    color: "#D2232A",
    colorName: "red",
    description:
      "El estado peruano requiere desarrollar las políticas públicas que aceleren el  desarrollo digital del pais concertando con todos los sectores públicos y privados involucrados. Las características transversales de estas políticas hacen necesario proporcionar una visión y enfoque integral en su desarrollo sin perder de vista el impulso a políticas específicas como es el caso de la brecha de acceso al Internet.",
    commentators: [
      {
        name: "Angélica Matsuda",
        title: "CEO Fueradelacaja Soluciones, Founder & President Perú D",
        linkedin: "https://www.linkedin.com/in/ang%C3%A9lica-matsuda-374a039/",
        imageUrl: `${config.storageUrl}/resources/exhibitors/angelica_matsuda.jpg`,
      },
      {
        name: "Marushka Chocobar",
        title: "Directora de la Secretaría de Gobierno y Transformación Digital PCM",
        linkedin: "https://www.linkedin.com/in/marushkachocobar/",
        imageUrl: `${config.storageUrl}/resources/exhibitors/marushka_chocobar.jpg`,
      },
      {
        name: "Juan Rivadeneyra",
        title: "Director de Regulación CLARO",
        linkedin: "https://www.linkedin.com/in/juan-rivadeneyra-8725202/",
        imageUrl: `${config.storageUrl}/resources/exhibitors/juan_rivadeneyra.jpg`,
      },
    ],
    exhibitors: [
      {
        name: "Raul Katz",
        lastName: "Katz",
        title:
          "President Telecom Advisory Services LLC, Director Business Strategy Research Columbia Institute for tele-Information",
        imageUrl: `${config.storageUrl}/resources/exhibitors/raul-katz.jpg`,
        subtitle: "Política Públicas para impulsar la TD del país",
        linkedin: "https://www.linkedin.com/in/raul-katz-b160687/",
        country: "argentine",
      },
      {
        name: "Julio Porcel",
        lastName: "Porcel",
        title:
          "Past President TDD, Coordinador del Componente 1 Proyecto BID para la mejora de las Compras Públicas del Perú",
        imageUrl: `${config.storageUrl}/resources/exhibitors/julio-porcel.jpg`,
        subtitle: "Panorama Digital del Perú",
        linkedin: "https://www.linkedin.com/in/julio-porcel-b931b135/",
        country: "peru",
      },
      {
        name: "Alfredo Astudillo",
        lastName: "Astudillo",
        title: "Vice Presidente TDD",
        imageUrl: `${config.storageUrl}/resources/exhibitors/alfredo-astudillo.jpg`,
        subtitle: "Aceleración del Avance Digital del Perú",
        linkedin: "https://www.linkedin.com/in/alfredoastudillo/",
        country: "peru",
      },
      {
        name: "Carlos Huaman",
        lastName: "Huaman",
        title: "Socio Fundador DN Consultores",
        imageUrl: `${config.storageUrl}/resources/exhibitors/carlos-huaman.jpg`,
        subtitle: "Política Pública Sectorial",
        linkedin: "https://www.linkedin.com/in/carlos-huam%C3%A1n-tomecich-economista-digital-4664338/",
        country: "peru",
      },
    ],
  },
  {
    name: "Bloque 2",
    date: "Jueves 9, 6:00 - 9:00 PM",
    title: "TRANSFORMACIÓN DIGITAL DE LAS ORGANIZACIONES PRIVADAS",
    color: "#39B54A",
    colorName: "green",
    description:
      "La transformación digital es importante en las organizaciones pues le brinda agilidad para ofrecer nuevos productos y servicios y mejorar la experiencia del cliente, cambiando fundamentalmente la forma en que opera para brindar valor a sus clientes.",
    commentators: [
      {
        name: "Jaime Dupuy",
        title: "Legal and Regulatory Affairs ManagerLegal Sociedad de Comercio Exterior del Perú ComexPerú",
        linkedin: "https://www.linkedin.com/in/jaimedupuy/",
        imageUrl: `${config.storageUrl}/resources/exhibitors/jaime-dupuy.jpeg`,
      },
      {
        name: "Javier Salinas",
        title:
          "Presidente Asociacion de Economia Plateada en el Perú, Promotor del ecosistema y regulación Fintech en el Perú y la región",
        linkedin: "https://www.linkedin.com/in/javierrsalinasm/",
        imageUrl: `${config.storageUrl}/resources/exhibitors/javier_salinas.jpg`,
      },
      {
        name: "Roque Benavides",
        title: "Presidente de Directorio Compañía de Minas Buenaventura",
        linkedin: "https://www.linkedin.com/in/roque-benavides-ganoza-298a4246/",
        imageUrl: `${config.storageUrl}/resources/exhibitors/roque_benavides.jpg`,
      },
    ],
    exhibitors: [
      {
        name: "Fernando Zavala",
        lastName: "Zavala",
        title: "Presidente de Directorio Grupo Interbank",
        imageUrl: `${config.storageUrl}/resources/exhibitors/fernando-zavala.jpg`,
        subtitle: "Liderazgo, Estrategia Digital & Gobierno Corporativo",
        linkedin: "https://www.linkedin.com/in/fernandozavala/",
        country: "peru",
      },
      {
        name: "Walter Cabanillas",
        lastName: "Cabanillas",
        title: "Digital Native Universe Program Manager Microsoft Región Sur",
        imageUrl: `${config.storageUrl}/resources/exhibitors/walter-cabanillas.jpg`,
        subtitle: "Modelos de Negocio, Innovación & Rediseño de Procesos",
        linkedin: "https://www.linkedin.com/in/waltercabanillas/",
        country: "peru",
      },
      {
        name: "Liliana Alvarado",
        lastName: "Alvarado",
        title: "Directora Escuela Postgrado UTP Presidente TDD",
        imageUrl: `${config.storageUrl}/resources/exhibitors/liliana-alvarado.jpg`,
        subtitle: "Cambio Cultural & Desarrollo de Competencias y Capacidades (skillings)",
        linkedin: "https://www.linkedin.com/in/liliana-alvarado-48596715/",
        country: "peru",
      },
      {
        name: "Guillermo Pacheco",
        lastName: "Pacheco",
        title: "Gerente General NOVATRONIC",
        imageUrl: `${config.storageUrl}/resources/exhibitors/guillermo-pacheco.jpg`,
        subtitle: "Experiencias Exitosas de Transformación Digital",
        linkedin: "https://www.linkedin.com/in/guillermo-pacheco-7b74936/",
        country: "peru",
      },
    ],
  },
  {
    name: "Bloque 3",
    date: "Viernes 10, 6:00 - 9:00 PM",
    title: "TRANSFORMACIÓN DIGITAL ENFOCADA EN PYMES",
    color: "#F47B20",
    colorName: "orange",
    description:
      "El enfoque digital ha trasformado completamente la forma de relacionarse con los consumidores y las exigencias de estos, esto obliga a las organizaciones a tomar decisiones estratégicas y operativas sustentadas en tecnología para ponerlas al servicio del consumidor.",
    exhibitors: [
      {
        name: "Ignacio Couto",
        lastName: "Couto",
        title: "Profesor de Digital Transformation en el IE Business School",
        imageUrl: `${config.storageUrl}/resources/exhibitors/ignacio-couto.jpg`,
        subtitle: "La Transformación Digital como factor de Competitividad Empresarial",
        linkedin: "https://www.linkedin.com/in/ignaciocouto/",
        country: "spain",
      },
      {
        name: "Gabriel Amaro",
        lastName: "Amaro",
        title: "Director Ejecutivo Asociación de Gremios Productores Agrarios del Perú",
        imageUrl: `${config.storageUrl}/resources/exhibitors/gabriel-amaro.jpg`,
        subtitle: "Ecosistema para el desarrollo de las Pymes",
        linkedin: "https://www.linkedin.com/in/gabriel-amaro-54989818/",
        country: "peru",
      },
      {
        name: "Guillermo Rodríguez",
        lastName: "Rodríguez",
        title: "Operations & Information Systems Management Raymond A. Mason School of Business",
        imageUrl: `${config.storageUrl}/resources/exhibitors/guillermo-rodriguez.jpg`,
        subtitle: "La innovación como Clave del Éxito",
        linkedin: "https://www.linkedin.com/in/guillermo-rodr%C3%ADguez-abitia-363b5b4/",
        country: "italy",
      },
      {
        name: "Carlos Armando de la Flor",
        lastName: "Armando de la Flor",
        title: "CoFundador y CEO María Almenara",
        linkedin: "https://www.linkedin.com/in/cadelaflor/",
        imageUrl: `${config.storageUrl}/resources/exhibitors/carlos-armando.jpeg`,
        subtitle: "Caso María Almenara",
        country: "peru",
      },
    ],
  },
  {
    name: "Bloque 4",
    date: "Sábado 11, 9:00 AM - 12:00 PM",
    title: "TECNOLOGÍAS DIGITALES Y SU APLICACIÓN",
    color: "#00AEEF",
    colorName: "skyBlue",
    description:
      "Las Tecnologías Digitales son las impulsoras de la transformación y su entendimiento y dominio es imprescindible. La mejor forma para absorber estas tecnologías es utilizarlas en aplicaciones específicas en las cuales se pueda desarrollar la experiencia de uso y aprendizaje, así como la prueba del valor que estas tecnologías ofrecen.",
    exhibitors: [
      {
        name: "Juan José Miranda",
        lastName: "Miranda",
        title:
          "Director Digital Technology Innovation Blockchain & Web3 NTT DATA - Presidente de la Asociación Blockchain & DLT Peru ABPE",
        imageUrl: `${config.storageUrl}/resources/exhibitors/juan-miranda.jpg`,
        subtitle: "Aplicaciones de Block Chain",
        linkedin: "https://www.linkedin.com/in/jjmiranda/",
        country: "peru",
      },
      {
        name: "Benito Juárez",
        lastName: "Juárez",
        title: "Director Ejecutivo FabLab",
        imageUrl: `${config.storageUrl}/resources/exhibitors/benito-juarez.jpg`,
        subtitle: "Fabricación Digital (impresión 3D)",
        linkedin: "https://www.linkedin.com/in/benojuarez/",
        country: "peru",
      },
      {
        name: "Rosa Delgado",
        lastName: "Delgado",
        title: "Presidente IPv6 Council Perú, Emeritus Trustee Internet Society (ISOC)",
        imageUrl: `${config.storageUrl}/resources/exhibitors/rosa-delgado.jpg`,
        subtitle: "El Internet Industrial de las Cosas IIoT",
        linkedin: "https://www.linkedin.com/in/rosa-maria-delgado-024304/",
        country: "peru",
      },
      {
        name: "Jorge Aguinaga",
        lastName: "Aguinaga",
        title: "Gerente de Gestión Estratégica de Información UPC",
        imageUrl: `${config.storageUrl}/resources/exhibitors/jorge-aguinaga.jpeg`,
        subtitle: "Big Data y Data Analytics",
        linkedin: "https://www.linkedin.com/in/jorgeaguinaga/",
        country: "peru",
      },
      {
        name: "Edgar Pérez",
        lastName: "Pérez",
        title: "Asociado Grupo Gerson Lehrman, Instituto Ponemon y Centro de Globalización Chino, MrEdgarPerez.com",
        imageUrl: `${config.storageUrl}/resources/exhibitors/edgar-perez.jpg`,
        subtitle: "Metaverso",
        linkedin: "https://www.linkedin.com/in/edgarperez/",
        country: "peru",
      },
    ],
  },
];

export const sponsorsLists = [
  { imageUrl: `${config.storageUrl}/resources/sponsors/utp.svg` },
  { imageUrl: `${config.storageUrl}/resources/sponsors/microsoft.svg` },
  { imageUrl: `${config.storageUrl}/resources/sponsors/uni.png` },
  { imageUrl: `${config.storageUrl}/resources/sponsors/g&s.svg` },
  { imageUrl: `${config.storageUrl}/resources/sponsors/zytrust.svg` },
  { imageUrl: `${config.storageUrl}/resources/sponsors/ebombo.svg` },
];

export const accountStates = {
  valid: {
    color: darkTheme.basic.primary,
    label: "Válido",
  },
  notValid: {
    color: darkTheme.basic.danger,
    label: "No válido",
  },
  inProcess: {
    color: darkTheme.basic.action,
    label: "En proceso",
  },
};

export const verifiedState = {
  noVerified: {
    type: "danger",
    text: "Cancelar Verificacion",
  },
  verified: {
    type: "primary",
    text: "Verificar",
  },
};

export const videos = [
  {
    title: "TDD TALK 09 Ciberseguridad Factor Clave en la Transformación Digital",
    embedUrl: "https://www.youtube.com/watch?v=nV_0GHNWSyQ&t=2038s",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-1.jpg`,
  },
  {
    title: "TDD TALK 08 Transformación Digital en la Educación Superior",
    embedUrl: "https://www.youtube.com/watch?v=E08ziEsBc4w",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-2.jpg`,
  },
  {
    title: "TDD PRESENTA 01 Desarrollo de la Red Dorsal y Redes Regionales",
    embedUrl: "https://www.youtube.com/watch?v=TVuKGZ322_c",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-3.jpg`,
  },
  {
    title: "TDD TALK 07 Retos para la Transformación Digital",
    embedUrl: "https://www.youtube.com/watch?v=QeF8vplir6o",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-4.jpg`,
  },
  {
    title: "TDD PRESENTA 02 Impulso de la Identidad Digital",
    embedUrl: "https://www.youtube.com/watch?v=IZzmd6CE6rI",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-5.jpg`,
  },
  {
    title: "TDD TALK 06 Smart Cities",
    embedUrl: "https://www.youtube.com/watch?v=hIeLsZh95TI",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-6.jpg`,
  },
  {
    title: "TDD TALK 05 Experiencias Aplicadas en la Industria 4.0",
    embedUrl: "https://www.youtube.com/watch?v=6Gxeju7UIQE",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-7.jpg`,
  },
  {
    title: "TDD TALK 04 Innovación para la Transformación en Minería",
    embedUrl: "https://www.youtube.com/watch?v=8rjtNisRddQ",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-8.jpg`,
  },
  {
    title: "TDD TALK 03 Red Dorsal Nacional de Fibra Óptica - Desafíos y Oportunidades",
    embedUrl: "https://www.youtube.com/watch?v=5ymZokME0Q0",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-9.jpg`,
  },
  {
    title: "TDD TALK 02 La Travesía hacia el Liderazgo Transformador",
    embedUrl: "https://www.youtube.com/watch?v=CJtbkByS1vA&t=1s",
    portraitUrl: `${config.storageUrl}/resources/thumbnail-10.jpg`,
  },
];
