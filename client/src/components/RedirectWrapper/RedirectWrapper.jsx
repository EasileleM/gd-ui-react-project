import { Redirect} from "react-router-dom";
import React from 'react';

export function RedirectWrapper({ error }) {
  switch (error) {
      case 400: return <Redirect to='/400' />;
      case 404: return <Redirect to='/404' />;
      case 500: return <Redirect to='/500' />;
      default: return null;
  }
}