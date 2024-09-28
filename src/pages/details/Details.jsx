import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

export default function Details() {
    const { path, id } = useParams();
    const details = useLoaderData()
    const { age, adoptionFee, image, breed, description, gender, status, weight, name } = details
    

    console.log(path,id);
    console.log(details)

    // console.log('detaisl',details)
    return (
        <div>
            <img src={image} alt="" />
        </div>
    )
}
