import { useEffect, useState } from 'react'

function useBMI({ age, weight, height }) {
    const [BMI, setBMI] = useState(null);
    useEffect(() => {
        const url = `https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
                'X-RapidAPI-Key': '5c40381fc0msh7880c0810bb8aa0p134a9ajsne3214a4398a4'
            }
        };
        if (age && weight && height) {
            fetch(url, options)
                .then(res => res.json())
                .then(json => setBMI(json.data))
                .catch(err => console.error('error:' + err));
        }
    }, [age, weight, height])
    return BMI
}

export default useBMI