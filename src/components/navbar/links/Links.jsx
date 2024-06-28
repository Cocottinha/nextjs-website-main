"use client"
import { useState, useRef, useEffect } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Posts",
    path: "/blog",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
  const linksRef = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.links} ref={linksRef}>
        {links.map((link) => (
          <NavLink item={link} key={link.title}/>
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
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
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
    </div>
  );
};

export default Links;
