import {useCookies} from "react-cookie";
import {PropsWithChildren} from "react";

export default function LoggedInOnly({children}: PropsWithChildren) {
    const [cookies] = useCookies(['user_session']);
    return (
        <>
            {cookies.user_session && children}
            {!cookies.user_session && <p>Log in to see this page.</p>}
        </>
);
}
