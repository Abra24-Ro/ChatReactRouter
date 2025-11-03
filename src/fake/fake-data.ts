import {
  Plan,
  type Client,
  type Message,
} from "@/chat/interfaces/chat.interface";
import { sleep } from "@/lib/sleep";

// ! Auth
export const loginUser = async () => {
  await sleep(1200);
  return {
    id: "U1-12345",
    name: "RaroDev",
    email: "raro@gmail.com",
    token: "token-1234567890",
  };
};

export const checkAuth = async (token: string) => {
  await sleep(500);

  if (token !== "token-1234567890") {
    throw new Error("Invalid token");
  }

  console.log("checkAuth", token);

  return {
    id: "U1-12345",
    name: "RaroDev",
  };
};

//! ====== Clientes ======
const fakeClients = {
  records: {} as Record<string, Client>,
  getClient: (id: string) => fakeClients.records[id],
  getClients: () => {
    return Object.values(fakeClients.records).sort(
      (a, b) => b.memberSince.getTime() - a.memberSince.getTime()
    );
  },
  createEmptyClient: () => {
    const client: Client = {
      id: `C1-${Math.floor(10000 + Math.random() * 90000)}`, // Generates C1-XXXXX format
      name: "",
      email: "",
      phone: "",
      address: "",
      memberSince: new Date(),
      currentPlan: Plan.BASIC,
    };

    fakeClients.setClient(client);

    return client;
  },
  setClient: (client: Client) => {
    fakeClients.records[client.id] = client;
  },
};

export const getClients = async (): Promise<Client[]> => {
  await sleep(500);
  return fakeClients.getClients();
};

export const getClient = async (id: string): Promise<Client> => {
  await sleep(1000);
  const client = fakeClients.getClient(id);
  
  if (!client) {
    throw new Error(`Cliente con ID "${id}" no encontrado`);
  }
  
  return client;
};

//! ====== Mensajes ======
const fakeMessages = {
  records: {} as Record<string, Message[]>,
  getMessages: (clientId: string) => fakeMessages.records[clientId] || [],
  getAllMessages: () => {
    return Object.values(fakeMessages.records)
      .flat()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  addMessage: (message: Message) => {
    if (!fakeMessages.records[message.clientId]) {
      fakeMessages.records[message.clientId] = [];
    }
    fakeMessages.records[message.clientId].push(message);
  },
};

export const getClientMessages = async (
  clientId: string
): Promise<Message[]> => {
  await sleep(300);
  return fakeMessages.getMessages(clientId);
};

export const getAllMessages = async (): Promise<Message[]> => {
  await sleep(500);
  return fakeMessages.getAllMessages();
};

export const sendMessage = async (message: Omit<Message, "id" | "like">) => {
  await sleep(300);
  const newMessage: Message = {
    ...message,
    id: `M1-${Math.floor(10000 + Math.random() * 90000)}`,
    like: "neutral",
  };
  fakeMessages.addMessage(newMessage);
  return newMessage;
};

//! ====== Llenar datos ficticios ======
const clients: Client[] = [
  {
    id: "C1-74999",
    name: "Juan Rodríguez",
    email: "jrodriguez@gmail.com",
    phone: "+506 7952-6056",
    address: "Calle Principal, San Pedro, San José",
    memberSince: new Date("2023-02-23"),
    currentPlan: Plan.BASIC,
  },
  {
    id: "C1-81678",
    name: "María Vargas",
    email: "mfvargas@outlook.com",
    phone: "+506 6181-6404",
    address: "Avenida Central, Escazú, San José",
    memberSince: new Date("2022-10-20"),
    currentPlan: Plan.BASIC,
  },
  {
    id: "C1-60078",
    name: "José Hernández",
    email: "jphernandez@yahoo.com",
    phone: "+506 6853-4931",
    address: "200m Este del Parque Central, Alajuela",
    memberSince: new Date("2024-01-17"),
    currentPlan: Plan.PRO,
  },
  {
    id: "C1-68195",
    name: "Ana Campos",
    email: "alcampos@hotmail.com",
    phone: "+506 7839-6163",
    address: "Residencial Los Arcos, Casa 15, Heredia",
    memberSince: new Date("2024-10-17"),
    currentPlan: Plan.PRO,
  },
  {
    id: "C1-72336",
    name: "Carlos Mora",
    email: "camora85@gmail.com",
    phone: "+506 6029-7816",
    address: "Condominio Valle del Sol, Cartago",
    memberSince: new Date("2024-03-30"),
    currentPlan: Plan.BASIC,
  },
  {
    id: "C1-91234",
    name: "Isabel Castro",
    email: "ijimenez@empresa.co.cr",
    phone: "+506 7102-3987",
    address: "Barrio Los Yoses, San José",
    memberSince: new Date("2023-06-15"),
    currentPlan: Plan.PREMIUM,
  },
  {
    id: "C1-56789",
    name: "Roberto Quirós",
    email: "rsolano@corporacion.com",
    phone: "+506 6554-7852",
    address: "Curridabat, 300m Sur del Walmart",
    memberSince: new Date("2022-12-05"),
    currentPlan: Plan.ENTERPRISE,
  },
  {
    id: "C1-33456",
    name: "Patricia Wong",
    email: "pmendez@consultora.net",
    phone: "+506 6883-6594",
    address: "Residencial Monterán, Santa Ana",
    memberSince: new Date("2023-08-22"),
    currentPlan: Plan.PRO,
  },
  {
    id: "C1-12987",
    name: "Diego Chen",
    email: "dalvarado@tech.cr",
    phone: "+506 6999-5214",
    address: "Condominio Avalon, Tres Ríos",
    memberSince: new Date("2024-02-10"),
    currentPlan: Plan.PREMIUM,
  },
  {
    id: "C1-65432",
    name: "Sofía Blanco",
    email: "sramirez@grupo.com",
    phone: "+506 7254-8473",
    address: "Pinares de Curridabat, Casa 78",
    memberSince: new Date("2023-04-28"),
    currentPlan: Plan.ENTERPRISE,
  },
];

clients.forEach((client) => {
  fakeClients.setClient(client);
});

// Mensajes ficticios mejorados y ampliados
const messages: Message[] = [
  // Juan Rodríguez (C1-74999) - Conversación sobre actualización de plan
  {
    id: "M1-12345",
    clientId: "C1-74999",
    content:
      "¡Buenas tardes! Me gustaría recibir información detallada sobre cómo puedo actualizar mi plan actual. He estado usando el plan básico desde hace más de un año y creo que necesito más funcionalidades.",
    createdAt: new Date("2024-05-10T09:30:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-12346",
    clientId: "C1-74999",
    content:
      "¡Buenos días, Juan! Es un placer ayudarte. Veo que has sido un cliente valioso desde febrero de 2023. Efectivamente, tienes el plan Básico actualmente. Tenemos tres opciones de actualización: Plan Pro, Premium y Enterprise. Cada uno está diseñado para diferentes necesidades. ¿Podrías contarme qué funcionalidades específicas estás buscando o qué limitaciones has encontrado con tu plan actual?",
    createdAt: new Date("2024-05-10T09:35:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-12347",
    clientId: "C1-74999",
    content:
      "Me interesa especialmente el plan Pro. Necesito más almacenamiento porque estoy empezando a quedarme sin espacio, y también he visto que ofrece algunas herramientas de análisis que me serían muy útiles para mi negocio.",
    createdAt: new Date("2024-05-10T09:40:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-12348",
    clientId: "C1-74999",
    content:
      "¡Excelente elección! El Plan Pro es perfecto para lo que necesitas. Te incluye 50GB de almacenamiento adicional (vs. los 10GB del plan Básico), acceso completo a nuestro dashboard de análisis avanzado con reportes personalizables, soporte prioritario con tiempo de respuesta de menos de 2 horas, y además podrás integrar hasta 10 aplicaciones de terceros. El costo es de $29.99 mensuales o $299 anuales (ahorras 2 meses). ¿Te gustaría que procesara la actualización ahora mismo?",
    createdAt: new Date("2024-05-10T09:45:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-12349",
    clientId: "C1-74999",
    content:
      "Suena muy bien. ¿El cambio es inmediato? ¿Pierdo algo de mi información actual al hacer la actualización?",
    createdAt: new Date("2024-05-10T09:50:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-12350",
    clientId: "C1-74999",
    content:
      "Tranquilo, Juan. La actualización es completamente segura y se realiza en tiempo real. Toda tu información, archivos, configuraciones y preferencias se mantienen intactas. De hecho, se te aplicará un crédito proporcional de tu plan actual hacia el nuevo plan. El cambio toma aproximadamente 2 minutos y tendrás acceso inmediato a todas las nuevas funcionalidades. ¿Procedo con la actualización?",
    createdAt: new Date("2024-05-10T09:55:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-12351",
    clientId: "C1-74999",
    content:
      "¡Perfecto! Sí, adelante por favor. Me gustaría el plan anual para aprovechar el descuento.",
    createdAt: new Date("2024-05-10T10:00:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-12352",
    clientId: "C1-74999",
    content:
      "¡Excelente decisión! He procesado tu actualización al Plan Pro anual. Recibirás un correo de confirmación en los próximos minutos con todos los detalles de tu nueva suscripción y una guía rápida para aprovechar al máximo las nuevas funcionalidades. Tu nuevo plan ya está activo. ¡Bienvenido al Plan Pro, Juan! ¿Hay algo más en lo que pueda ayudarte hoy?",
    createdAt: new Date("2024-05-10T10:05:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-12353",
    clientId: "C1-74999",
    content:
      "¡Muchas gracias por tu ayuda! Por ahora es todo. Excelente servicio.",
    createdAt: new Date("2024-05-10T10:07:00"),
    sender: "client",
    like: "liked",
  },

  // María Vargas (C1-81678) - Problema de acceso a cuenta
  {
    id: "M1-23456",
    clientId: "C1-81678",
    content:
      "Hola, tengo un problema urgente. Desde esta mañana no puedo acceder a mi cuenta. He intentado varias veces con mi contraseña habitual y el sistema me indica que las credenciales son incorrectas. Esto es muy frustrante porque necesito acceder a información importante para una reunión que tengo en una hora.",
    createdAt: new Date("2024-05-12T14:20:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-23457",
    clientId: "C1-81678",
    content:
      "Hola María, lamento mucho que estés experimentando este inconveniente. Entiendo la urgencia de tu situación. Déjame ayudarte a resolver esto lo más rápido posible. Primero, verificaré el estado de tu cuenta. ¿Has intentado restablecer tu contraseña usando la opción de 'Olvidé mi contraseña' en la página de inicio de sesión?",
    createdAt: new Date("2024-05-12T14:25:00"),
    sender: "agent",
    like: "neutral",
  },
  {
    id: "M1-23458",
    clientId: "C1-81678",
    content:
      "Sí, lo intenté hace como 30 minutos, pero no he recibido ningún correo de restablecimiento. Ya revisé mi bandeja de entrada varias veces y tampoco está en spam. ¿Qué más puedo hacer?",
    createdAt: new Date("2024-05-12T14:30:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-23459",
    clientId: "C1-81678",
    content:
      "Entiendo perfectamente tu preocupación, María. Acabo de revisar tu cuenta y veo el problema. Por seguridad, tu cuenta fue bloqueada temporalmente después de varios intentos fallidos de inicio de sesión. Es un protocolo automático de seguridad. Lo que voy a hacer es: 1) Desbloquear tu cuenta inmediatamente, y 2) Enviarte manualmente un enlace de restablecimiento de contraseña a tu correo registrado (mfvargas@outlook.com). Por favor revisa tu correo en los próximos 2-3 minutos, incluyendo la carpeta de spam o correo no deseado.",
    createdAt: new Date("2024-05-12T14:35:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-23460",
    clientId: "C1-81678",
    content:
      "¡Perfecto! Ya recibí el correo y pude restablecer mi contraseña. Acabo de iniciar sesión sin problemas. Muchísimas gracias por la ayuda rápida, realmente lo necesitaba.",
    createdAt: new Date("2024-05-12T14:42:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-23461",
    clientId: "C1-81678",
    content:
      "¡Me alegra mucho que todo esté resuelto, María! Para evitar futuros bloqueos, te recomiendo activar la autenticación de dos factores en tu perfil. Esto no solo aumenta la seguridad de tu cuenta, sino que también te permite recuperar el acceso más fácilmente. Si necesitas ayuda para configurarlo, con gusto te puedo guiar. ¡Mucho éxito en tu reunión!",
    createdAt: new Date("2024-05-12T14:45:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-23462",
    clientId: "C1-81678",
    content:
      "Buena idea, lo configuraré más tarde. Gracias de nuevo, ¡excelente servicio!",
    createdAt: new Date("2024-05-12T14:47:00"),
    sender: "client",
    like: "liked",
  },

  // José Hernández (C1-60078) - Consulta sobre características del plan Pro
  {
    id: "M1-34567",
    clientId: "C1-60078",
    content:
      "Buenas tardes. Contraté el plan Pro hace una semana y quisiera conocer en detalle todas las nuevas características y herramientas que tengo disponibles ahora. Quiero asegurarme de estar aprovechando al máximo mi inversión.",
    createdAt: new Date("2024-05-15T11:10:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-34568",
    clientId: "C1-60078",
    content:
      "¡Excelente pregunta, José! Me encanta que quieras aprovechar al máximo tu plan Pro. Te detallo todas las características principales: 1) Almacenamiento: 50GB (vs. 10GB del básico), 2) Dashboard de Análisis Avanzado con reportes personalizables y exportación en múltiples formatos, 3) Soporte Prioritario con respuesta en menos de 2 horas, 4) Integración con hasta 10 aplicaciones de terceros (Zapier, Slack, Google Workspace, etc.), 5) API de acceso con 10,000 llamadas mensuales, 6) Backup automático diario con retención de 30 días, 7) Colaboración en equipo hasta 5 usuarios, y 8) Acceso anticipado a nuevas funcionalidades beta.",
    createdAt: new Date("2024-05-15T11:15:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-34569",
    clientId: "C1-60078",
    content:
      "¡Wow! No sabía que incluía tantas cosas. Me interesa especialmente lo del dashboard de análisis y las integraciones. ¿Cómo puedo acceder a esas herramientas?",
    createdAt: new Date("2024-05-15T11:20:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-34570",
    clientId: "C1-60078",
    content:
      "Para acceder al Dashboard de Análisis, ve a tu panel principal y encontrarás una nueva sección llamada 'Analytics' en el menú lateral izquierdo. Ahí podrás crear reportes personalizados, visualizar gráficos de tendencias y programar reportes automáticos. Para las integraciones, ve a Configuración > Integraciones, donde verás un catálogo de todas las apps disponibles con instrucciones paso a paso para cada una. ¿Te gustaría que te enviara por correo una guía completa en PDF sobre cómo configurar las integraciones más populares?",
    createdAt: new Date("2024-05-15T11:25:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-34571",
    clientId: "C1-60078",
    content:
      "Sí, por favor. Eso sería muy útil. Y una pregunta más: ¿el backup automático ya está activo o tengo que configurarlo?",
    createdAt: new Date("2024-05-15T11:28:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-34572",
    clientId: "C1-60078",
    content:
      "El backup automático se activó automáticamente cuando actualizaste tu plan, así que ya está funcionando y protegiendo tu información. Puedes verificarlo en Configuración > Seguridad > Backups, donde verás el historial completo de respaldos. Te acabo de enviar la guía de integraciones a tu correo jphernandez@yahoo.com. Si tienes cualquier duda mientras exploras las nuevas funcionalidades, no dudes en contactarme. ¡Disfruta tu plan Pro!",
    createdAt: new Date("2024-05-15T11:32:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-34573",
    clientId: "C1-60078",
    content:
      "Perfecto, muchísimas gracias por la información tan completa y clara. ¡Excelente atención!",
    createdAt: new Date("2024-05-15T11:35:00"),
    sender: "client",
    like: "liked",
  },

  // Ana Campos (C1-68195) - Nueva cliente con dudas sobre funcionalidades
  {
    id: "M1-78901",
    clientId: "C1-68195",
    content:
      "Hola, soy nueva en la plataforma, me registré hace apenas dos días. Tengo algunas dudas sobre cómo usar ciertas funcionalidades básicas. ¿Me podrían ayudar?",
    createdAt: new Date("2024-10-19T15:20:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-78902",
    clientId: "C1-68195",
    content:
      "¡Hola Ana! ¡Bienvenida a nuestra plataforma! Por supuesto que te ayudaremos con mucho gusto. Estamos aquí para que tu experiencia sea excelente desde el primer día. Cuéntame, ¿qué funcionalidades específicas te gustaría aprender a usar? Así puedo darte indicaciones precisas y útiles.",
    createdAt: new Date("2024-10-19T15:23:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-78903",
    clientId: "C1-68195",
    content:
      "Principalmente quiero saber cómo organizar mis proyectos en carpetas y cómo compartir archivos con otras personas. También vi que hay plantillas disponibles pero no sé cómo acceder a ellas.",
    createdAt: new Date("2024-10-19T15:27:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-78904",
    clientId: "C1-68195",
    content:
      "Perfecto, te explico paso a paso: Para crear carpetas, ve a la sección 'Mis Proyectos' y haz clic en el botón '+' en la esquina superior derecha, luego selecciona 'Nueva Carpeta'. Para compartir archivos, haz clic derecho sobre cualquier archivo o carpeta y selecciona 'Compartir', ahí podrás ingresar los correos de las personas y elegir los permisos (solo ver o editar). Y para las plantillas, en el menú principal encontrarás una sección llamada 'Plantillas' con categorías como Negocios, Educación, Marketing, etc. ¿Te gustaría que te enviara un video tutorial que cubre estos temas?",
    createdAt: new Date("2024-10-19T15:32:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-78905",
    clientId: "C1-68195",
    content:
      "¡Sí, por favor! Un video sería genial. Y otra cosa, ¿puedo trabajar sin conexión a internet?",
    createdAt: new Date("2024-10-19T15:35:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-78906",
    clientId: "C1-68195",
    content:
      "¡Claro que sí! Tenemos modo offline. Con tu plan Pro, puedes activarlo en Configuración > Modo Offline. Esto te permitirá acceder y editar tus archivos sin conexión, y todos los cambios se sincronizarán automáticamente cuando vuelvas a tener internet. Te acabo de enviar el video tutorial a alcampos@hotmail.com. También te incluí nuestro manual de inicio rápido en PDF. Si tienes más dudas mientras exploras, aquí estaré para ayudarte. ¡Disfruta la plataforma!",
    createdAt: new Date("2024-10-19T15:40:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-78907",
    clientId: "C1-68195",
    content:
      "Muchísimas gracias, han sido muy amables y claros. Me siento mucho más confiada ahora para usar la plataforma.",
    createdAt: new Date("2024-10-19T15:43:00"),
    sender: "client",
    like: "liked",
  },

  // Carlos Mora (C1-72336) - Consulta sobre facturación
  {
    id: "M1-89012",
    clientId: "C1-72336",
    content:
      "Buenos días. Tengo una duda sobre mi última factura. Veo un cargo adicional que no entiendo. ¿Me pueden explicar de qué se trata?",
    createdAt: new Date("2024-05-25T10:15:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-89013",
    clientId: "C1-72336",
    content:
      "Buenos días, Carlos. Con gusto te ayudo a aclarar esto. Déjame revisar tu cuenta y facturación. ¿Puedes indicarme el monto del cargo adicional que ves y la fecha aproximada de la factura?",
    createdAt: new Date("2024-05-25T10:18:00"),
    sender: "agent",
    like: "neutral",
  },
  {
    id: "M1-89014",
    clientId: "C1-72336",
    content:
      "Es un cargo de $15.00 en la factura del 20 de mayo. Mi plan básico cuesta $9.99, entonces no entiendo ese monto adicional.",
    createdAt: new Date("2024-05-25T10:22:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-89015",
    clientId: "C1-72336",
    content:
      "Gracias por la información, Carlos. Ya revisé tu cuenta. El cargo adicional de $15.00 corresponde a almacenamiento extra que utilizaste durante este ciclo de facturación. Tu plan básico incluye 10GB, y durante el mes pasado utilizaste aproximadamente 18GB. El sistema cobra automáticamente $1.99 por cada GB adicional. Sin embargo, veo que has estado cerca del límite los últimos meses. ¿Te gustaría considerar una actualización al plan Pro? Incluye 50GB y terminarías pagando menos que con los cargos extra recurrentes.",
    createdAt: new Date("2024-05-25T10:27:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-89016",
    clientId: "C1-72336",
    content:
      "Ah, ya entiendo. No sabía que había superado el límite. ¿Cuánto cuesta el plan Pro y qué más incluye aparte del almacenamiento?",
    createdAt: new Date("2024-05-25T10:30:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-89017",
    clientId: "C1-72336",
    content:
      "El plan Pro cuesta $29.99 mensuales e incluye: 50GB de almacenamiento, herramientas de análisis avanzadas, soporte prioritario, integraciones con apps de terceros, API de acceso, backups diarios automáticos y colaboración hasta 5 usuarios. Considerando tus cargos extra recurrentes por almacenamiento, estarías invirtiendo prácticamente lo mismo pero con muchas más funcionalidades. ¿Te gustaría que procesara la actualización? Además, te aplicaría un crédito proporcional de tu plan actual.",
    createdAt: new Date("2024-05-25T10:35:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-89018",
    clientId: "C1-72336",
    content:
      "Tiene sentido. Sí, adelante con la actualización por favor. Mejor tener todo incluido que estar con cargos sorpresa cada mes.",
    createdAt: new Date("2024-05-25T10:38:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-89019",
    clientId: "C1-72336",
    content:
      "¡Excelente decisión, Carlos! He procesado tu actualización al plan Pro. Ya está activo y recibirás un correo con todos los detalles. Tu próxima factura reflejará el nuevo plan con el crédito aplicado. Ahora tienes 50GB y todas las funcionalidades premium. ¿Hay algo más en lo que pueda ayudarte hoy?",
    createdAt: new Date("2024-05-25T10:42:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-89020",
    clientId: "C1-72336",
    content:
      "No, eso es todo. Gracias por la explicación clara y por la recomendación. ¡Buen servicio!",
    createdAt: new Date("2024-05-25T10:44:00"),
    sender: "client",
    like: "liked",
  },

  // Isabel Castro (C1-91234) - Solicitud de funcionalidad personalizada
  {
    id: "M1-45678",
    clientId: "C1-91234",
    content:
      "Hola, tengo una consulta sobre funcionalidades. Mi equipo necesita generar reportes con campos personalizados que no veo disponibles en las plantillas actuales. ¿Es posible crear reportes completamente personalizados en el plan Premium?",
    createdAt: new Date("2024-06-02T09:15:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-45679",
    clientId: "C1-91234",
    content:
      "¡Buenos días, Isabel! Excelente pregunta. Con tu plan Premium, definitivamente tienes acceso a reportes personalizados avanzados. La funcionalidad de Custom Reports te permite: crear campos personalizados, elegir métricas específicas, diseñar visualizaciones personalizadas, programar generación automática y exportar en múltiples formatos. Para acceder, ve a Analytics > Reportes Personalizados > Crear Nuevo. ¿Qué tipo de datos específicos necesitas incluir en tus reportes?",
    createdAt: new Date("2024-06-02T09:20:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-45680",
    clientId: "C1-91234",
    content:
      "Necesitamos rastrear métricas de conversión por campaña, tasa de retención de clientes por trimestre y análisis de ROI por canal de marketing. También queremos cruzar estos datos con información demográfica de nuestros clientes.",
    createdAt: new Date("2024-06-02T09:25:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-45681",
    clientId: "C1-91234",
    content:
      "Perfecto, todas esas métricas son totalmente configurables. Puedes crear dashboards personalizados que combinen todas esas variables. Te recomiendo configurar: 1) Un reporte maestro con todas las métricas, 2) Dashboards específicos por área (conversión, retención, ROI), y 3) Alertas automáticas cuando ciertos indicadores superen umbrales definidos. ¿Te gustaría que agendemos una sesión de 30 minutos para configurar esto juntos? Puedo mostrarte cómo hacerlo y así tu equipo podrá replicarlo.",
    createdAt: new Date("2024-06-02T09:32:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-45682",
    clientId: "C1-91234",
    content:
      "Eso sería fantástico. ¿Cuándo podríamos hacerlo? Preferiblemente esta semana si es posible.",
    createdAt: new Date("2024-06-02T09:35:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-45683",
    clientId: "C1-91234",
    content:
      "Claro que sí. Tengo disponibilidad este jueves 6 de junio a las 2:00 PM o viernes 7 a las 10:00 AM. ¿Cuál te viene mejor? Te enviaré un link de videollamada y compartiré mi pantalla para guiarte paso a paso.",
    createdAt: new Date("2024-06-02T09:38:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-45684",
    clientId: "C1-91234",
    content:
      "El jueves a las 2:00 PM me viene perfecto. Muchísimas gracias por la disposición y la ayuda proactiva.",
    createdAt: new Date("2024-06-02T09:40:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-45685",
    clientId: "C1-91234",
    content:
      "¡Perfecto! Te acabo de enviar la invitación al calendario con el link de la reunión a tu correo ijimenez@empresa.co.cr. Nos vemos el jueves. Si antes de la sesión tienes dudas o quieres que prepare algo específico, no dudes en escribirme. ¡Que tengas un excelente día!",
    createdAt: new Date("2024-06-02T09:43:00"),
    sender: "agent",
    like: "liked",
  },

  // Roberto Quirós (C1-56789) - Gestión de usuarios Enterprise
  {
    id: "M1-56789",
    clientId: "C1-56789",
    content:
      "Buenas tardes. Nuestra empresa está creciendo rápidamente y necesitamos agregar 5 nuevos usuarios a nuestra cuenta Enterprise lo antes posible. También necesitamos asignarles diferentes niveles de permisos según sus roles. ¿Cuál es el proceso para hacer esto de manera eficiente?",
    createdAt: new Date("2024-05-18T16:45:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-56790",
    clientId: "C1-56789",
    content:
      "Buenas tardes, Roberto. ¡Felicitaciones por el crecimiento de su empresa! Con su plan Enterprise, agregar usuarios es muy sencillo y tienen usuarios ilimitados incluidos. Hay dos formas de hacerlo: 1) Autoservicio desde el Panel de Administración > Usuarios > Agregar Usuario, o 2) Puedo asistirles directamente con el proceso y configurar los permisos específicos que necesitan. La segunda opción suele ser más rápida cuando se agregan varios usuarios simultáneamente. ¿Cuál prefieren?",
    createdAt: new Date("2024-05-18T16:50:00"),
    sender: "agent",
    like: "neutral",
  },
  {
    id: "M1-56791",
    clientId: "C1-56789",
    content:
      "Preferiría que nos asistieran directamente. Necesitamos configurar esto correctamente desde el inicio para evitar problemas de seguridad o permisos incorrectos más adelante.",
    createdAt: new Date("2024-05-18T16:55:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-56792",
    clientId: "C1-56789",
    content:
      "Excelente decisión, Roberto. Para proceder eficientemente necesito la siguiente información de cada nuevo usuario: nombre completo, correo electrónico corporativo, departamento, y el nivel de permisos requerido. Los niveles disponibles son: Admin (acceso total), Editor (crear/editar contenido), Colaborador (editar contenido asignado), y Viewer (solo lectura). ¿Tienen esta información lista o prefieren enviármela por correo en un documento?",
    createdAt: new Date("2024-05-18T17:00:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-56793",
    clientId: "C1-56789",
    content:
      "La tengo aquí. Le comparto: 1) Andrea Solís - asoilis@corporacion.com - Marketing - Editor, 2) Miguel Fallas - mfallas@corporacion.com - Ventas - Editor, 3) Laura Jiménez - ljimenez@corporacion.com - Soporte - Colaborador, 4) David Rojas - drojas@corporacion.com - Finanzas - Viewer, 5) Carolina Vega - cvega@corporacion.com - Operaciones - Admin.",
    createdAt: new Date("2024-05-18T17:05:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-56794",
    clientId: "C1-56789",
    content:
      "Perfecto, Roberto. Dame unos minutos para crear las cuentas y configurar los permisos correctamente. Cada usuario recibirá un correo de bienvenida con instrucciones para activar su cuenta y establecer su contraseña. ¿Desean que configure alguna restricción adicional como autenticación de dos factores obligatoria o limitaciones de acceso por horario/IP?",
    createdAt: new Date("2024-05-18T17:08:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-56795",
    clientId: "C1-56789",
    content:
      "Sí, por favor active la autenticación de dos factores obligatoria para todos. Es parte de nuestras políticas de seguridad corporativa.",
    createdAt: new Date("2024-05-18T17:11:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-56796",
    clientId: "C1-56789",
    content:
      "Entendido. He creado las 5 cuentas con los permisos especificados y activé la autenticación de dos factores obligatoria para cada una. Los correos de bienvenida ya fueron enviados. También he actualizado su dashboard de administración para que pueda monitorear la actividad de estos usuarios. Adicionalmente, configuré un grupo llamado 'Nuevos usuarios Mayo 2024' para facilitar la gestión. ¿Necesita algo más para estos usuarios?",
    createdAt: new Date("2024-05-18T17:18:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-56797",
    clientId: "C1-56789",
    content:
      "Excelente, muy completo. Una última cosa: ¿estos usuarios tienen acceso a todos los proyectos existentes o necesito asignarlos manualmente a cada proyecto?",
    createdAt: new Date("2024-05-18T17:22:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-56798",
    clientId: "C1-56789",
    content:
      "Buena pregunta. Por seguridad y mejores prácticas, los nuevos usuarios NO tienen acceso automático a proyectos existentes. Deberá asignarlos manualmente desde cada proyecto en la sección de Colaboradores, o desde el Panel de Administración > Proyectos > Asignar Usuarios. Esto le da control total sobre qué información ve cada persona según su rol. ¿Le gustaría que le envíe una guía rápida sobre gestión de permisos por proyecto?",
    createdAt: new Date("2024-05-18T17:27:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-56799",
    clientId: "C1-56789",
    content:
      "Sí, por favor envíemela. Ha sido de gran ayuda. Muchísimas gracias por el servicio tan eficiente y profesional.",
    createdAt: new Date("2024-05-18T17:30:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-56800",
    clientId: "C1-56789",
    content:
      "Con mucho gusto, Roberto. Te acabo de enviar la guía completa a rsolano@corporacion.com. Si tienen más preguntas mientras configuran los proyectos o necesitan agregar más usuarios en el futuro, estamos a su disposición. ¡Mucho éxito con su crecimiento!",
    createdAt: new Date("2024-05-18T17:33:00"),
    sender: "agent",
    like: "liked",
  },

  // Patricia Wong (C1-33456) - Integración con herramientas externas
  {
    id: "M1-67890",
    clientId: "C1-33456",
    content:
      "Hola, necesito ayuda para integrar nuestra cuenta con Slack y Google Workspace. Queremos que las notificaciones importantes lleguen automáticamente a nuestro canal de Slack y que los documentos se sincronicen con Google Drive.",
    createdAt: new Date("2024-06-08T14:30:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-67891",
    clientId: "C1-33456",
    content:
      "¡Hola Patricia! Excelente idea implementar estas integraciones, mejorarán mucho el flujo de trabajo de tu equipo. Con tu plan Pro, tienes acceso completo a ambas integraciones. Para Slack: puedes recibir notificaciones de nuevos proyectos, mensajes, tareas completadas y alertas. Para Google Workspace: sincronización bidireccional con Drive, Calendar y Gmail. ¿Quieres que te guíe paso a paso para configurar ambas?",
    createdAt: new Date("2024-06-08T14:35:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-67892",
    clientId: "C1-33456",
    content:
      "Sí, por favor. Empecemos con Slack que es más urgente. ¿Es complicado?",
    createdAt: new Date("2024-06-08T14:38:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-67893",
    clientId: "C1-33456",
    content:
      "Para nada, es muy sencillo. Aquí van los pasos: 1) Ve a Configuración > Integraciones > Buscar 'Slack', 2) Haz clic en 'Conectar con Slack', 3) Te redirigirá a Slack para autorizar la conexión (necesitarás permisos de administrador del workspace), 4) Selecciona el canal donde quieres recibir las notificaciones, 5) Elige qué tipo de notificaciones quieres recibir (puedes personalizar por tipo de evento), 6) Guarda la configuración. Todo el proceso toma unos 3 minutos. ¿Tienes permisos de administrador en tu Slack?",
    createdAt: new Date("2024-06-08T14:43:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-67894",
    clientId: "C1-33456",
    content:
      "Sí, soy administradora. Déjame intentarlo ahora... Perfecto, ya lo conecté. Configuré el canal #proyectos para recibir las notificaciones. ¿Cómo pruebo que funciona?",
    createdAt: new Date("2024-06-08T14:50:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-67895",
    clientId: "C1-33456",
    content:
      "¡Excelente! Para probar, puedes crear un proyecto de prueba o actualizar un proyecto existente. La notificación debería llegar a Slack en menos de 30 segundos. También puedes ir a Integraciones > Slack > Enviar Mensaje de Prueba, y verificarás que todo está funcionando correctamente. Ahora, ¿procedemos con Google Workspace?",
    createdAt: new Date("2024-06-08T14:53:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-67896",
    clientId: "C1-33456",
    content:
      "¡Acaba de llegar la notificación de prueba a Slack! Funciona perfecto. Sí, ahora hagamos Google Workspace. Principalmente nos interesa la sincronización con Drive.",
    createdAt: new Date("2024-06-08T14:56:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-67897",
    clientId: "C1-33456",
    content:
      "Perfecto. Para Google Drive: 1) Ve a Configuración > Integraciones > Google Workspace, 2) Haz clic en 'Conectar con Google', 3) Inicia sesión con tu cuenta de Google corporativa, 4) Autoriza los permisos (lectura y escritura en Drive), 5) Selecciona la carpeta de Drive donde quieres sincronizar (puedes crear una nueva o usar existente), 6) Elige si quieres sincronización automática o manual, 7) Guarda. Te recomiendo crear una carpeta específica llamada 'Proyectos - [Nombre empresa]' para mantener todo organizado.",
    createdAt: new Date("2024-06-08T15:02:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-67898",
    clientId: "C1-33456",
    content:
      "Listo, ya está conectado con una carpeta nueva en Drive. Configuré sincronización automática. ¿Los cambios que haga en Drive se reflejan aquí y viceversa?",
    createdAt: new Date("2024-06-08T15:08:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-67899",
    clientId: "C1-33456",
    content:
      "Exacto, es sincronización bidireccional en tiempo real. Si editas un documento en Drive, los cambios aparecen aquí en máximo 2 minutos. Lo mismo al revés. Importante: si eliminas algo en Drive, se marcará para eliminación aquí (pero puedes recuperarlo desde la papelera por 30 días). ¿Hay alguna otra integración que te interese configurar? Tenemos disponibles Zapier, Microsoft Teams, Trello, y más.",
    createdAt: new Date("2024-06-08T15:12:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-67900",
    clientId: "C1-33456",
    content:
      "Por ahora con estas dos estamos bien. Ha sido muy fácil y rápido gracias a tu ayuda. ¡Excelente soporte!",
    createdAt: new Date("2024-06-08T15:15:00"),
    sender: "client",
    like: "liked",
  },

  // Diego Chen (C1-12987) - Problema de rendimiento después de actualización
  {
    id: "M1-78012",
    clientId: "C1-12987",
    content:
      "Buenas tardes, tengo un problema serio. Desde que se instaló la última actualización del sistema esta mañana, nuestra plataforma está extremadamente lenta. Las páginas tardan más de 15 segundos en cargar y algunas funciones directamente no responden. Esto está afectando las operaciones diarias de mi equipo.",
    createdAt: new Date("2024-05-22T13:40:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-78013",
    clientId: "C1-12987",
    content:
      "Buenas tardes, Diego. Lamento mucho escuchar sobre estos problemas de rendimiento. Entiendo perfectamente lo crítico que es esto para tus operaciones. Estamos conscientes de que la actualización v2.5.3 implementada esta mañana está causando problemas de lentitud en algunas cuentas Premium con alta carga de datos. Nuestro equipo de ingeniería ya está trabajando en un hotfix que estará disponible en las próximas 24 horas. Mientras tanto, déjame implementar algunas soluciones temporales para mitigar el problema. ¿Cuántos usuarios activos tienen aproximadamente en tu equipo?",
    createdAt: new Date("2024-05-22T13:45:00"),
    sender: "agent",
    like: "neutral",
  },
  {
    id: "M1-78014",
    clientId: "C1-12987",
    content:
      "Somos 12 usuarios activos diariamente. El problema es que tenemos clientes esperando entregas y no podemos acceder a la información necesaria con normalidad. ¿Las soluciones temporales realmente ayudarán o debo buscar alternativas para hoy?",
    createdAt: new Date("2024-05-22T13:50:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-78015",
    clientId: "C1-12987",
    content:
      "Entiendo tu preocupación, Diego, y quiero ser honesto contigo. Las soluciones temporales deberían mejorar el rendimiento en un 60-70%, no al 100%, pero será suficiente para trabajar. Aquí está lo que voy a hacer AHORA MISMO: 1) Migrar temporalmente tu cuenta a nuestros servidores de alta prioridad (esto toma 5 minutos), 2) Optimizar tu base de datos y limpiar caché, 3) Desactivar temporalmente algunas funciones no críticas que están consumiendo recursos (análisis en tiempo real, sincronización automática cada 30 seg), 4) Aumentar tus recursos de servidor temporalmente sin costo. ¿Te parece bien que proceda?",
    createdAt: new Date("2024-05-22T13:55:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-78016",
    clientId: "C1-12987",
    content:
      "Sí, por favor hazlo inmediatamente. Cualquier mejora ayuda en este momento. ¿Me avisas cuando termines?",
    createdAt: new Date("2024-05-22T14:00:00"),
    sender: "client",
    like: "neutral",
  },
  {
    id: "M1-78017",
    clientId: "C1-12987",
    content:
      "Por supuesto. Iniciando el proceso ahora... [5 minutos después] Listo, Diego. He completado todas las optimizaciones. Tu cuenta ya está en los servidores prioritarios. Por favor, pide a tu equipo que recargue completamente la página (Ctrl+Shift+R o Cmd+Shift+R en Mac) para que los cambios tomen efecto. Deberían notar una mejora significativa inmediatamente. Voy a quedarme monitoreando tu cuenta durante la próxima hora para asegurarme de que todo funciona correctamente. ¿Puedes probar y confirmarme cómo va?",
    createdAt: new Date("2024-05-22T14:05:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-78018",
    clientId: "C1-12987",
    content:
      "Acabo de recargar y la diferencia es notable. Las páginas cargan en 3-4 segundos ahora, mucho mejor que antes. Todavía no es perfecto pero ya es manejable para trabajar. Gracias por la respuesta rápida.",
    createdAt: new Date("2024-05-22T14:12:00"),
    sender: "client",
    like: "liked",
  },
  {
    id: "M1-78019",
    clientId: "C1-12987",
    content:
      "Me alegra mucho que haya mejorado, Diego. Sé que no es ideal pero al menos pueden continuar trabajando. Te mantendré informado sobre el progreso del hotfix definitivo. Cuando esté listo (mañana máximo), te notificaré personalmente y lo aplicaremos en un horario que no afecte tus operaciones. También, como compensación por las molestias, voy a acreditarte un mes gratis de servicio. ¿Te parece bien?",
    createdAt: new Date("2024-05-22T14:18:00"),
    sender: "agent",
    like: "liked",
  },
  {
    id: "M1-78020",
    clientId: "C1-12987",
    content:
      "Aprecio mucho tanto la solución inmediata como el gesto de compensación. Por favor mantenme informado sobre el hotfix. Gracias por tomarte esto tan en serio.",
    createdAt: new Date("2024-05-22T14:22:00"),
    sender: "client",
    like: "liked",
  },
];

// Agregar mensajes al sistema
messages.forEach((message) => {
  fakeMessages.addMessage(message);
});
