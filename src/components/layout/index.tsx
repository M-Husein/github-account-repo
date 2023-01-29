import { type ReactNode } from "react";
import Head from 'next/head';
import { Provider } from "react-redux";
import store from "@/store/store";
import NavMain from "./NavMain";

interface Props {
  children?: ReactNode
  title?: string
}

const LayoutMain = ({ children, title }: Props) => {
  return (
    <Provider store={store}>
      <Head>
        <title>{title}</title>
      </Head>

      <NavMain />

      {children}
    </Provider>
  );
};
  
export default LayoutMain;
