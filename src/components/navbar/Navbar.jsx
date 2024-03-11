import { auth } from "@/lib/auth";
import Links from "./links/Links"
import styles from "./navbar.module.css"
import Link from "next/link"

const Navbar = async() => {
    const session = await auth();
    return(
        <div className={styles.container}>
            <div>
                <Link href="/" className={styles.logo}><i className="material-icons" style={{fontSize:"30px"}}>layers</i>Lab.Data</Link>
            </div>          
            <div>
                <Links session={session}></Links>
            </div>
        </div>
    )
}

export default Navbar