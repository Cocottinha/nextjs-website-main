import { auth } from "@/lib/auth";
import Links from "./links/Links"
import styles from "./navbar.module.css"
import Link from "next/link"
import Image from "next/image";

const Navbar = async() => {
    const session = await auth();
    return(
        <div className={styles.container}>
            <div>
                <Link href="/" className={styles.logo}><Image src="/Lab.Mov_Símbolo_Principal.svg" width={40} height={40} className={styles.logoI} alt="logo"/>Lab.Data</Link>
            </div>          
            <div>
                <Links session={session}></Links>
            </div>
        </div>
    )
}

export default Navbar