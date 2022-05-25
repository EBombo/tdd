import { config } from "../../firebase";

export const registrationOptions = {
  visitor: {
    title: "No soy alumno universitario",
    icon: `${config.storageUrl}/resources/user.svg`,
    description: "Si no eres alumno universitario deberás adquirir tu entrada a s/ 95 si deseas ingresar a la feria.",
  },
  student: {
    title: "Soy alumno universitario",
    icon: `${config.storageUrl}/resources/student.svg`,
    description: "Si eres alumno universitario tendrás entrada libre a la feria.",
  },
};
