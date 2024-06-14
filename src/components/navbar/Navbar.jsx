"use client"
import { useEffect, useState } from 'react';
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const sessionData = localStorage.getItem('auth-token')
    setSession(sessionData);
  };

  useEffect(() => {
    fetchSession();

    const handleStorageChange = () => {
      fetchSession();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Link href="/" className={styles.logo}>
          <Image src="/Lab.Mov_Símbolo_Principal.svg" width={40} height={40} className={styles.logoI} alt="logo" />Lab.Data
        </Link>
      </div>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
