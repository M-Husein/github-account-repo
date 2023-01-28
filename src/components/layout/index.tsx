import type { ReactNode } from "react";
import Head from 'next/head';
import NavMain from "./NavMain";

interface Props {
  children?: ReactNode
  title?: string,
}

const LayoutMain = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <NavMain />

      {children}
    </>
  );
};
  
export default LayoutMain;
