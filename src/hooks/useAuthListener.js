// import { useState, useEffect, useContext } from 'react';
import jwtDecode from "jwt-decode";

export default function useAuthListener() {
  let user, jwt;

  try {
    jwt = localStorage.getItem("token");
    user = jwtDecode(jwt);
  } catch (error) {
    user = null;
  }

  return { user, jwt };
}
