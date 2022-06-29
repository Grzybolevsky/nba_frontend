import { useCookies } from 'react-cookie';
import {PropsWithChildren, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

export default function LoggedInOnly({ children }: PropsWithChildren) {
  const [cookies] = useCookies(['logged']);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if(searchParams.get("logged")) {
      console.log('logged')
      document.cookie = `logged=true;max-age=604800;`
    }
  }, [searchParams])
  return (
    <>
      {cookies.logged && children}
      {!cookies.logged && <p>Log in to see this page.</p>}
    </>
  );
}
