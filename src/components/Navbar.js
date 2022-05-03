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
    <>
      <nav className="h-[50px] lg:h-[120px] flex items-center justify-between flex-wrap px-4 bg-white shadow-navbar">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <Image
            src={`${config.storageUrl}/resources/logo-tdd-utp-vector.svg`}
            height="35px"
            desktopHeight="55px"
            size="contain"
            margin="0"
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
              <span className="mx-2">
                <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/home.svg`} />
              </span>
              <span className={path === "/" && "text-pink-500"}>Inicio</span>
            </LeftAnchor>
            <LeftAnchor url="/timeline">
              <span className="mx-2">
                <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/schedule.svg`} />
              </span>
              <span className={path === "/timeline" && "text-pink-500"}>Programa</span>
            </LeftAnchor>
            <LeftAnchor url="/exhibitors">
              <span className="mx-2">
                <Image className="inline-block" width="12px" src={`${config.storageUrl}/resources/lectern.svg`} />
              </span>
              <span className={path === "/exhibitors" && "text-pink-500"}>Expositores</span>
            </LeftAnchor>
          </div>

          <div>
            <Button primary onClick={() => router.push(authUser ? "/buy-tickets" : "/register")}>
              Adquirir entrada
            </Button>

            {!authUser ? (
              <Button onClick={() => router.push("/login")}>
                Iniciar sesión
              </Button>
            ) : (
              <Button margin="ml-2" onClick={() => signOut()}>
                Cerrar sesión
              </Button>
            )}
          </div>
        </div>

        {menuDrawer && (
          <div className="absolute top-[50px] right-0 z-10 py-8 w-full block flex-grow lg:flex lg:items-center lg:w-auto bg-white">
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

      <div className="">
        <div className="w-[100wv] min-h-[calc(100vh-50px)] lg:min-h-[calc(100vh-120px)]">{props.children}</div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Navbar;
