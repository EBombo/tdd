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
    date: "Miércoles 8",
    title: "Políticas Públicas",
    color: "red",
    description:
      "El estado peruano requiere desarrollar las políticas públicas que aceleren el  desarrollo digital del pais concertando con todos los sectores públicos y privados involucrados. Las características transversales de estas políticas hacen necesario proporcionar una visión y enfoque integral en su desarrollo sin perder de vista el impulso a políticas específicas como es el caso de la brecha de acceso al Internet.",
    commentators: [
      {
        name: "Angélica Matsuda",
        title: "CEO Fueradelacaja Soluciones, Founder & President Perú D",
        linkedin: "https://www.linkedin.com/in/ang%C3%A9lica-matsuda-374a039/",
      },
      {
        name: "Marushka Chocobar",
        title: "Directora de la Secretaría de Gobierno y Transformación Digital PCM",
        linkedin: "https://www.linkedin.com/in/marushkachocobar/",
      },
      {
        name: "Juan Rivadeneyra",
        title: "Director de Regulación CLARO",
        linkedin: "https://www.linkedin.com/in/juan-rivadeneyra-8725202/",
      },
    ],
    exhibitors: [
      {
        name: "Raul Katz",
        title:
          "President Telecom Advisory Services LLC, Director Business" +
          "Strategy Research Columbia Institute for tele-Information",
        imageUrl: `${config.storageUrl}/resources/exhibitors/raul-katz.jpg`,
        subtitle: "Política Públicas para impulsar la TD del país",
        linkedin: "https://www.linkedin.com/in/raul-katz-b160687/",
        country: "argentine",
      },
      {
        name: "Julio Porcel",
        title: "Past President TDD",
        imageUrl: `${config.storageUrl}/resources/exhibitors/julio-porcel.jpg`,
        subtitle: "Panorama Digital del Perú",
        linkedin: "https://www.linkedin.com/in/julio-porcel-b931b135/",
        country: "peru",
      },
      {
        name: "Alfredo Astudillo",
        title: "Vice Presidente TDD",
        imageUrl: `${config.storageUrl}/resources/exhibitors/alfredo-astudillo.jpg`,
        subtitle: "Aceleración del Avance Digital del Perú",
        linkedin: "https://www.linkedin.com/in/alfredoastudillo/",
        country: "peru",
      },
      {
        name: "Carlos Huaman",
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
    date: "Jueves 9",
    title: "TRANSFORMACIÓN DIGITAL DE LAS ORGANIZACIONES PRIVADAS",
    color: "green",
    description:
      "La transformación digital es importante en las organizaciones pues le brinda agilidad para ofrecer nuevos productos y servicios y mejorar la experiencia del cliente, cambiando fundamentalmente la forma en que opera para brindar valor a sus clientes.",
    commentators: [
      {
        name: "Jaime Dupuy",
        title: "Legal and Regulatory Affairs ManagerLegal Sociedad de Comercio Exterior del Perú ComexPerú",
        linkedin: "https://www.linkedin.com/in/jaimedupuy/",
      },
      {
        name: "Javier Salinas",
        title:
          "Presidente Asociacion de Economia Plateada en el Perú, Promotor del ecosistema y regulación Fintech en el Perú y la región",
        linkedin: "https://www.linkedin.com/in/javierrsalinasm/",
      },
      {
        name: "Roque Benavides",
        title: "Presidente de Directorio Compañía de Minas Buenaventura",
        linkedin: "https://www.linkedin.com/in/roque-benavides-ganoza-298a4246/",
      },
    ],
    exhibitors: [
      {
        name: "Fernando Zavala",
        title: "Presidente de Directorio Grupo Interbank",
        imageUrl: `${config.storageUrl}/resources/exhibitors/fernando-zavala.jpg`,
        subtitle: "Liderazgo, Estrategia Digital & Gobierno Corporativo",
        linkedin: "https://www.linkedin.com/in/fernandozavala/",
        country: "peru",
      },
      {
        name: "Walter Cabanillas",
        title: "Digital Native Universe Program Manager Microsoft Región Sur",
        imageUrl: `${config.storageUrl}/resources/exhibitors/walter-cabanillas.jpg`,
        subtitle: "Modelos de Negocio, Innovación & Rediseño de Procesos",
        linkedin: "https://www.linkedin.com/in/waltercabanillas/",
        country: "peru",
      },
      {
        name: "Liliana Alvarado",
        title: "Directora Escuela Postgrado UTP Presidente TDD",
        imageUrl: `${config.storageUrl}/resources/exhibitors/liliana-alvarado.jpg`,
        subtitle: "Cambio Cultural & Desarrollo de Competencias y Capacidades (skillings)",
        linkedin: "https://www.linkedin.com/in/liliana-alvarado-48596715/",
        country: "peru",
      },
      {
        name: "Guillermo Pacheco",
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
    date: "Viernes 10",
    title: "TRANSFORMACIÓN DIGITAL DE LAS ORGANIZACIONES PRIVADAS",
    color: "orange",
    description:
      "El enfoque digital ha trasformado completamente la forma de relacionarse con los consumidores y las exigencias de estos, esto obliga a las organizaciones a tomar decisiones estratégicas y operativas sustentadas en tecnología para ponerlas al servicio del consumidor.",
    commentators: [
      {
        name: "Carlos Armando de la Flor",
        title: "CoFundador y CEO María Almenara",
        linkedin: "https://www.linkedin.com/in/cadelaflor/",
      },
    ],
    exhibitors: [
      {
        name: "Ignacio Couto",
        title: "Profesor de Digital Transformation en el IE Business School",
        imageUrl: `${config.storageUrl}/resources/exhibitors/ignacio-couto.jpg`,
        subtitle: "La Transformación Digital como factor de Competitividad Empresarial",
        linkedin: "https://www.linkedin.com/in/ignaciocouto/",
        country: "spain",
      },
      {
        name: "Gabriel Amaro",
        title: "Director Ejecutivo Asociación de Gremios Productores Agrarios del Perú",
        imageUrl: `${config.storageUrl}/resources/exhibitors/gabriel-amaro.jpg`,
        subtitle: "Ecosistema para el desarrollo de las Pymes",
        linkedin: "https://www.linkedin.com/in/gabriel-amaro-54989818/",
        country: "peru",
      },
      {
        name: "Guillermo Rodríguez",
        title: "Operations & Information Systems Management Raymond A. Mason School of Business",
        imageUrl: `${config.storageUrl}/resources/exhibitors/guillermo-rodriguez.jpg`,
        subtitle: "La innovación como Clave del Éxito",
        linkedin: "https://www.linkedin.com/in/guillermo-rodr%C3%ADguez-abitia-363b5b4/",
        country: "italy",
      },
    ],
  },
  {
    name: "Bloque 4",
    date: "Sábado 11",
    title: "TECNOLOGÍAS DIGITALES Y SU APLICACIÓN",
    color: "skyBlue",
    description:
      "Las Tecnologías Digitales son las impulsoras de la transformación y su entendimiento y dominio es imprescindible. La mejor forma para absorber estas tecnologías es utilizarlas en aplicaciones específicas en las cuales se pueda desarrollar la experiencia de uso y aprendizaje, así como la prueba del valor que estas tecnologías ofrecen.",
    exhibitors: [
      {
        name: "Juan José Miranda",
        title:
          "Director Digital Technology Innovation Blockchain & Web3 NTT DATA - Presidente de la Asociación Blockchain & DLT Peru ABPE",
        imageUrl: `${config.storageUrl}/resources/exhibitors/juan-miranda.jpg`,
        subtitle: "Aplicaciones de Block Chain",
        linkedin: "https://www.linkedin.com/in/jjmiranda/",
        country: "spain",
      },
      {
        name: "Benito Juárez",
        title: "Director Ejecutivo FabLab",
        imageUrl: `${config.storageUrl}/resources/exhibitors/benito-juarez.jpg`,
        subtitle: "Fabricación Digital (impresión 3D)",
        linkedin: "https://www.linkedin.com/in/benojuarez/",
        country: "peru",
      },
      {
        name: "Rosa Delgado",
        title: "IPv6 Council Perú",
        imageUrl: `${config.storageUrl}/resources/exhibitors/rosa-delgado.jpg`,
        subtitle: "El Internet Industrial de las Cosas IIoT",
        linkedin: "https://www.linkedin.com/in/rosa-maria-delgado-024304/",
        country: "peru",
      },
      {
        name: "Jorge Aguinaga",
        title: "Gerente de Gestión Estratégica de Información UPC",
        imageUrl: `${config.storageUrl}/resources/exhibitors/jorge-aguinaga.jpg`,
        subtitle: "Big Data y Data Analytics",
        linkedin: "https://www.linkedin.com/in/jorgeaguinaga/",
        country: "peru",
      },
      {
        name: "Edgar Pérez",
        title: "Asociado Grupo Gerson Lehrman, Instituto Ponemon y Centro de Globalización Chino, MrEdgarPerez.com",
        imageUrl: `${config.storageUrl}/resources/exhibitors/edgar-perez.jpg`,
        subtitle: "Metaverso",
        linkedin: "https://www.linkedin.com/in/edgarperez/",
        country: "peru",
      },
    ],
  },
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
