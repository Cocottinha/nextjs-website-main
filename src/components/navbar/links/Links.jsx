"use client"
import { useState, useRef } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";

export const handleLogout = async () => {
  await fetch(`${window.location.origin}/api/logout`, {
    method: 'POST',
  });
  localStorage.clear()
  window.location.href = '/';
};

const links = [
  {
    title: "Início",
    path: "/",
  },
  {
    title: "Sobre",
    path: "/about",
  },
  {
    title: "Contato",
    path: "/contact",
  },
  {
    title: "Postagens",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
  const linksRef = useRef(null);

  console.log(session)
  return (
    <div className={styles.container}>
      <div className={styles.links} ref={linksRef}>
        {links.map((link) => (
          <NavLink item={link} key={link.title}/>
        ))}
        {session? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout} onClick={handleLogout}>Sair</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Entrar", path: "/login" }} />
        )}
      </div>
      <button
        className={`${styles.btnMenu} ${open ? styles.rotate : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src="/burger-menu-svgrepo-com.svg"
          width={40}
          height={40}
          priority={true}
          alt="menu"
        />
      </button>
      <div 
        className={`${styles.mobileLinks} ${open ? styles.open : ""}`}
      >
        {open &&
          links.map((link) => (
            <NavLink item={link} key={link.title}/>
          ))}
        {session? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout} onClick={handleLogout}>Sair</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Entrar", path: "/login" }} />
        )}
      </div>
    </div>
  );
};

export default Links;
