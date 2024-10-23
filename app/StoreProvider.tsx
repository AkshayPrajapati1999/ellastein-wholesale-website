"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import client from "@/service/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { useRef, useState } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../redux/store";
import Register from "./register/page";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showRegister, setShowRegister] = useState(false);
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
  };

  return (
    <>
      <Provider store={storeRef.current}>
        <ApolloProvider client={client}>
          {showRegister ? (
            <div className="main">
              <Register />
            </div>
          ) : (
            <div className="main">
              <Header onRegisterClick={handleRegisterClick} />
              <main> {children}</main>
              <Footer />
            </div>
          )}
        </ApolloProvider>
      </Provider>
    </>
  );
}
