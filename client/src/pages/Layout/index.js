import React from 'react';

import {Header} from '../../components/index';
import {Footer} from '../../components/index';

export function Layout(props) {
  return (
    <>
      <Header />
      {props.page}
      <Footer />
    </>
  );
}