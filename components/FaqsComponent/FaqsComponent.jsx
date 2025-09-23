"use client"

import React, {useState, useEffect} from 'react'
import PocketBase from "pocketbase";
import Loader from "../Loader/Loader";


const FaqsComponent = () => {
    const [faqs, setFaqs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
    pb.autoCancellation(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const records = await pb.collection("faqs").getFullList({
            });
            setFaqs(records);
          } catch (error) {
            console.error("Error fetching data: ", error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);

  return (
    <div className='pb-20'>
        {loading ? <Loader /> : (
            <div className="w-full max-w-2xl mx-auto my-8">
                {faqs.map((faq) => (
                    <div key={faq.id} className="collapse collapse-arrow bg-base-100 shadow-md mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title font-semibold bg-[#2C3480] text-white">{faq.question}</div>
                        <div className="collapse-content text-sm bg-[#2C3480] text-white" dangerouslySetInnerHTML={{ __html: faq.answer }}>

                        </div>
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default FaqsComponent