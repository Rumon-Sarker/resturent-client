import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonail = () => {

    const [review, setReview] = useState([])
    useEffect(() => {
        fetch('https://resturent-server-seven.vercel.app/review')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])
    return (
        <section className="my-20">
            <SectionTitle
                subHeading="What Our Client Say "
                heading="Testimoniels"
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    review.map(item => <SwiperSlide key={item._id}>
                        <div className="flex flex-col items-center mx-24 my-16  mt-12">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={item.rating}
                                readOnly
                            />
                            <p className="py-12">{item.details}</p>
                            <h1 className="text-orange-500 font-bold text-2xl uppercase">{item.name}</h1>
                        </div>
                    </SwiperSlide>)

                }

            </Swiper>
        </section>
    );
};

export default Testimonail;