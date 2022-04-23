import { useEffect, useState } from 'react'

function useIdealWeight({ height, gender }) {
    const [idealWeight, setIdealWeight] = useState(null);
    useEffect(() => {
        const url = `https://fitness-calculator.p.rapidapi.com/idealweight?height=${height}&gender=${gender}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
                'X-RapidAPI-Key': '5c40381fc0msh7880c0810bb8aa0p134a9ajsne3214a4398a4'
            }
        };
        if (gender && height) {
            fetch(url, options)
                .then(res => res.json())
                .then(json => setIdealWeight(json.data?.Miller))
                .catch(err => console.error('error:' + err));
        }
    }, [gender, height])
    return idealWeight
}

export default useIdealWeight