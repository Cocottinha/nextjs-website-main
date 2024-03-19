"use server"
import { promises as fs } from 'fs';

let arrayA=[]
let arrayB=[]

export async function readTextFileXRF(file) {
    const text = await fs.readFile(file, 'utf-8');
    const line = text.split('\n');
    let contaLinhas = 0;

    if(line.includes(';')){
        line.forEach(l => {

            let part = l.trim().split(';');

            if (part[1] && part[0] !== undefined) {
                const num = parseFloat(part[0])
                const num1 = parseFloat(part[1].trim())
                arrayA.push(num)
                arrayB.push(num1);
            }
            
        })
    }
    else{
        line.forEach(l => {
            contaLinhas++;
            if (contaLinhas > 21) {
                
                let part = l.trim().split(',');
    
                if (part[1] && part[0] !== undefined) {
                    const num = parseFloat(part[0])
                    const num1 = parseFloat(part[1].trim())
                    arrayA.push(num)
                    arrayB.push(num1);
                }
            }
            
        })
    }
    
    return (
        { arrayA, arrayB }
    )
}
