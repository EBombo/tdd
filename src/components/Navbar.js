import React, { useEffect, useGlobal, useState } from "reactn";
import { useRouter } from "next/router";
import { config } from "../firebase";
import { Image } from "./common/Image";
import { Anchor, Button } from "./form";
import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer";

// TODO: Implement Navbar
const Navbar = (props) => {
  const router = useRouter();

  const { signOut } = useAuth();

  const path = router.pathname;

  const [authUser] = useGlobal("user");

  const [menuDrawer, setMenuDrawer] = useState(false);

  useEffect(() => {
    router.prefetch("/buy-tickets");
    router.prefetch("/register");
    router.prefetch("/login");
  }, []);

  const LeftAnchor = React.memo(({ children, url }) => (
    <Anchor className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-pink-500 py-2" url={url}>
      <span className="text-base mx-4">{children}</span>
    </Anchor>
  ));

  return (
    <div className="relative h-[100vh] w-[100wv] overflow-hidden">
      <nav className="h-[100px] absolute top-0 left-0 right-0 z-[999] flex items-center justify-between flex-wrap px-4 bg-white shadow-navbar">
        <div className="flex items-center flex-shrink-0 text-black mr-6 cursor-pointer lg:min-w-[170px]">
          <Image
            src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`}
            height="85px"
            size="contain"
            margin="0"
            onClick={() => router.push(authUser ? "/admin" : "/")}
          />
        </div>

        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 rounded text-black "
            onClick={() => setMenuDrawer((oldValue) => !oldValue)}
          >
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div className="w-full hidden lg:block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <LeftAnchor url="/">
              <span className="mx-2 min-w-[12px]">
                {path === "/" ? (
                  <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/home-pink.svg`} />
                ) : (
                  <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/home.svg`} />
                )}
              </span>
              <span className={path === "/" && "text-pink-500"}>Inicio</span>
            </LeftAnchor>
            <LeftAnchor url="/timeline">
              <span className="mx-2 min-w-[12px]">
                {path === "/timeline" ? (
                  <Image
                    className="inline-block"
                    width="12px"
                    src={`${config.storageUrl}/resources/schedule-pink.svg`}
                  />
                ) : (
                  <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/schedule.svg`} />
                )}
              </span>
              <span className={path === "/timeline" && "text-pink-500"}>Programa</span>
            </LeftAnchor>
            <LeftAnchor url="/exhibitors">
              <span className="mx-2">
                {path === "/exhibitors" ? (
                  <Image
                    className="inline-block"
                    width="12px"
                    src={`${config.storageUrl}/resources/lectern-pink.svg`}
                  />
                ) : (
                  <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/lectern.svg`} />
                )}
              </span>
              <span className={path === "/exhibitors" && "text-pink-500"}>Expositores</span>
            </LeftAnchor>
          </div>

          <div>
            <Button primary onClick={() => router.push(authUser ? "/buy-tickets" : "/register")}>
              {!authUser ? "Registrarse" : "Adquirir entrada"}
            </Button>

            {!authUser ? (
              <Button onClick={() => router.push("/login")}>Iniciar sesión</Button>
            ) : (
              <Button margin="ml-2" onClick={() => signOut()}>
                Cerrar sesión
              </Button>
            )}
          </div>
        </div>

        {menuDrawer && (
          <div className="absolute top-[100px] right-0 z-10 py-8 w-full block flex-grow lg:flex lg:items-center lg:w-auto bg-white">
            <div className="text-sm lg:flex-grow">
              <LeftAnchor url="/">
                <span className="mx-2">
                  <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/home.svg`} />
                </span>
                Inicio
              </LeftAnchor>
              <LeftAnchor url="/timeline">
                <span className="mx-2">
                  <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/schedule.svg`} />
                </span>
                Programa
              </LeftAnchor>
              <LeftAnchor url="/exhibitors">
                <span className="mx-2">
                  <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/lectern.svg`} />
                </span>
                Expositores
              </LeftAnchor>
            </div>

            <div>
              <div className="text-center">
                <Button margin="m-2" primary onClick={() => router.push(authUser ? "/buy-tickets" : "/register")}>
                  Adquirir entrada
                </Button>
              </div>

              {!authUser ? (
                <div className="text-center">
                  <Button margin="m-2" onClick={() => router.push("/login")}>
                    Iniciar sesión
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Button margin="m-2" onClick={() => signOut()}>
                    Cerrar sesión
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="absolute top-[100px] left-0 right-0 h-[calc(100vh-100px)] overflow-auto">
        <div className="min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-120px)]">{props.children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Navbar;
