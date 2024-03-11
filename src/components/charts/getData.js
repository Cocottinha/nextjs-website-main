"use server"
import { promises as fs } from 'fs';

let arrayA=[]
let arrayB=[]

export async function readTextFile(file) {
    const text = await fs.readFile(file, 'utf-8');
    const line = text.split('\n');

    line.forEach(l => {
        let part = l.trim().split(';');
        part = part.map((n) => {
            let newvalue = n.replace(",", ".")
            return newvalue
        })
        
        if (part[1] && part[0] !== undefined) {
            const num = parseFloat(part[0])
            const num1 = parseFloat(part[1].trim())
            arrayA.push(num)
            arrayB.push(num1);
        }

    })
    return (
        {arrayA,arrayB}
    )
    
}
