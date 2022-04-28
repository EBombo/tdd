import { config } from "../../firebase";

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
    commentators: "Angélica Matsuda | Marushka Chocobar | Juan Rivadeneyra",
    exhibitors: [
      {
        name: "Raul Katz",
        title: "",
        subtitle: "Política Públicas para impulsar la TD del país",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Julio Porcel",
        title: "Past President TDD",
        subtitle: "Panorama Digital del Perú",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Alfredo Astudillo",
        title: "Vice Presidente TDD",
        subtitle: "Aceleración del Avance Digital del Perú",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Carlos Huaman",
        title: "Socio Fundador DN Consultores",
        subtitle: "Política Pública Sectorial",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
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
    commentators: "Jaime Dupuy (Cómex) | Javier Salinas | Roque Benavides",
    exhibitors: [
      {
        name: "Fernando Zavala",
        title: "Presidente de Directorio Grupo Interbank",
        subtitle: "Liderazgo, Estrategia Digital & Gobierno Corporativo",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Carlos Osorio",
        title: "",
        subtitle: "Modelos de Negocio, Innovación & Rediseño de Procesos",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Liliana Alvarado",
        title: "Directora Escuela Postgrado UTP Presidente TDD",
        subtitle: "Cambio Cultural & Desarrollo de Competencias y Capacidades (skillings)",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Guillermo Pacheco",
        title: "Gerente General NOVATRONIC",
        subtitle: "Experiencias Exitosas de Transformación Digital",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
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
    commentators: "María Almenara Armando de la Flor",
    exhibitors: [
      {
        name: "Manuel Alonso Coto",
        title: "IE Business School",
        subtitle: "La Transformación Digital como factor de Competitividad Empresarial",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "spain",
      },
      {
        name: "Gabriel Amaro",
        title: "",
        subtitle: "Ecosistema para el desarrollo de las Pymes",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Guillermo Rodríguez",
        title: "Operations & Information Systems Management Raymond A. Mason School of Business",
        subtitle: "La innovación como Clave del Éxito",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
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
        title: "",
        subtitle: "Aplicaciones de Block Chain",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "spain",
      },
      {
        name: "Benito Juárez",
        title: "Director Ejecutivo FabLab",
        subtitle: "Fabricación Digital (impresión 3D)",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Rosa Delgado",
        title: "IPv6 Council Perú",
        subtitle: "El Internet Industrial de las Cosas IIoT",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Jorge Aguinaga",
        title: "Gerente de Gestión Estratégica de Información UPC",
        subtitle: "Big Data y Data Analytics",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
      {
        name: "Edgar Pérez",
        title: "",
        subtitle: "Metaverso",
        linkedin: "https://www.google.com",
        twitter: "https://www.google.com",
        country: "peru",
      },
    ],
  },
];
