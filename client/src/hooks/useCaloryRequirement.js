import { useEffect, useState } from 'react'

function useCaloryRequirement({ age, weight, height, gender }) {
    const [calory, setCalory] = useState(null);
    useEffect(() => {
        const url = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&weight=${weight}&height=${height}&gender=${gender}&activitylevel=level_3`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
                'X-RapidAPI-Key': '5c40381fc0msh7880c0810bb8aa0p134a9ajsne3214a4398a4'
            }
        };
        if (age && weight && height && gender) {
            fetch(url, options)
                .then(res => res.json())
                .then(json => setCalory(json.data?.goals))
                .catch(err => console.error('error:' + err));
        }
    }, [age, weight, height, gender])
    return calory
}

export default useCaloryRequirement