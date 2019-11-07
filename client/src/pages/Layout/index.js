import React, { Suspense } from 'react';

import { Header, Footer, LoadingSpinner } from '../../components/index';

export function Layout(props) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <>
        <Header />
        {props.page}
        <Footer />
      </>
    </Suspense>
  );
}