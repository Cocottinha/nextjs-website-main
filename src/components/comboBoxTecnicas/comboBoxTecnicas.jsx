"use client"
import { useState } from "react"
import styles from "./comboBoxTecnicas.module.css"

export default function ComboBox ({posts, setSortedPosts}){

    const [selectedOption , setSelectedOption] = useState('1')
    const handleSelectChange = (event) => {
        const option = event.target.value;

        setSelectedOption(option);

        const sortByDateAscending = () => {
            setSortedPosts([...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        };
    
        const sortByDateDescending = () => {
            setSortedPosts([...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        };


        switch (option) {
            case '1': 
                setSortedPosts(posts);
                break;
            case '2': 
                sortByDateDescending()
                break;
            case '3': 
                sortByDateAscending()
                break;
            case '4': 
                setSortedPosts([...posts].sort((a, b) => a.title.localeCompare(b.title)));
                break;
            default:
                break;
        }
    };
    return(
        <div className={styles.button}>
            <h3>Filtro:</h3>
            <select value={selectedOption} id="filters" onChange={handleSelectChange}>
                <option value="1">Todas</option>
                <option value="2">MO</option>
                <option value="3">FTIR</option>
                <option value="4">XRF</option>
            </select>
        </div>
    )
}
