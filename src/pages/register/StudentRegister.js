import React, { useGlobal } from "reactn";
import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Select } from "../../components/form";
import { getData } from "country-list";

export const StudentRegister = (props) => {
  const [isLoadingUser] = useGlobal("isLoadingUser");
  const [isLoadingCreateUser] = useGlobal("isLoadingCreateUser");

  const schema = object().shape({
    countryCode: string().required(),
    name: string().required(),
    lastName: string().required(),
    documentId: string().required(),
    phoneNumber: string().required().min(5),
    email: string().required().email(),
    email2: string().required().email(),
    password: string().required().min(6),
    university: string().required(),
    career: string().required(),
    studentId: string().required(),
    reference: string(),
  });

  const { register, errors, handleSubmit, control } = useForm({
    validationSchema: schema,
    reValidateMode: "onSubmit",
  });

  return (
    <form onSubmit={handleSubmit(props.signUpUser)}>
      <div className="text-['Encode Sans'] font-[700] text-[20px] leading-[25px] md:text-[40px] md:leading-[44px]">
        Regístrate
      </div>
      <div className="my-4">
        Si eres alumno universitario, crea tu cuenta con tus datos y accede a tu entrada gratuita.
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-[repeat(2,1fr)] items-end">
        <Input name="name" type="text" ref={register} error={errors.name} height="50px" placeholder="Nombres" />
        <Input
          name="lastName"
          type="text"
          ref={register}
          error={errors.lastName}
          height="50px"
          placeholder="Apellidos"
        />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-[repeat(2,1fr)] items-end">
        <Input name="documentId" type="text" ref={register} error={errors.documentId} height="50px" placeholder="DNI" />
        <Input
          name="phoneNumber"
          type="text"
          ref={register}
          error={errors.phoneNumber}
          height="50px"
          placeholder="Celular"
        />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-[repeat(2,1fr)] items-end">
        <Input
          name="university"
          type="text"
          ref={register}
          error={errors.university}
          height="50px"
          placeholder="Universidad"
        />
        <Input name="career" type="text" ref={register} error={errors.career} height="50px" placeholder="Carrera" />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-[repeat(2,1fr)] items-end">
        <Input name="email" type="text" ref={register} error={errors.email} height="50px" placeholder="Correo" />
        <Input
          name="email2"
          type="text"
          ref={register}
          error={errors.email2}
          height="50px"
          placeholder="Confirmar correo"
        />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-[repeat(2,1fr)] items-end">
        <Input
          name="password"
          type="password"
          ref={register}
          error={errors.password}
          height="50px"
          placeholder="Contraseña"
        />
        <Input
          name="studentId"
          type="text"
          ref={register}
          error={errors.studentId}
          height="50px"
          placeholder="Código de alumno"
        />
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-[repeat(2,1fr)] items-end">
        <Controller
          name="countryCode"
          control={control}
          defaultValue={"PE"}
          as={
            <Select
              placeholder="País"
              showSearch
              virtual={false}
              height="50px"
              error={errors.countryCode}
              optionFilterProp="children"
              optionsdom={getData().map((country) => ({
                key: country.code,
                code: country.code,
                name: country.name,
              }))}
            />
          }
        />
        <div className="flex flex-col items-end">
          <div className="text-primary font-[600] text-[12px] leading-[15px] text-['Encode Sans']">*Opcional</div>
          <Input
            name="reference"
            type="text"
            ref={register}
            error={errors.reference}
            height="50px"
            placeholder="¿Cómo te enteraste del evento?"
          />
        </div>
      </div>

      <div className="flex">
        <Button
          margin="mx-auto"
          onClick={() => props.setRegisterOption(null)}
          disabled={isLoadingUser || isLoadingCreateUser}
        >
          Volver
        </Button>

        <Button
          primary
          margin="mx-auto"
          htmlType="submit"
          loading={isLoadingCreateUser}
          disabled={isLoadingUser || isLoadingCreateUser}
        >
          Registrarse
        </Button>
      </div>

      <div className="py-4">
        <div className="text-['Encode Sans'] text-blackDarken font-[400] text-[16px] leading-[20px]">
          Si ya tienes una cuenta puedes ingresar con tu correo y contraseña.
        </div>

        <Button margin="mt-4" onClick={() => router.push("/login")}>
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
};
