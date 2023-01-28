import { type ReactElement } from 'react';
import Home from '@/components/home';
import LayoutMain from '@/components/layout';

const Page = () => {
  return (
    <main className="container py-3">
      <Home />
    </main>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutMain title="Github Account Repo">
      {page}
    </LayoutMain>
  )
}

export default Page;
