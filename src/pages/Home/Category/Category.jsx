import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import img1 from "../../../assets/home/slide1.jpg"
import img2 from "../../../assets/home/slide2.jpg"
import img3 from "../../../assets/home/slide3.jpg"
import img4 from "../../../assets/home/slide4.jpg"
import img5 from "../../../assets/home/slide5.jpg"
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle
                subHeading={"11:00 am to 10:50 pm"}
                heading={"Our Categories"}
            >
            </SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide>
                    <img src={img1} alt="Cetegory" />
                    <h1 className='text-3xl text-center text-white uppercase -mt-16 font-bold'>Salad</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="Cetegory" />
                    <h1 className='text-3xl text-center text-white uppercase -mt-16 font-bold'>Pizza</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="Cetegory" />
                    <h1 className='text-3xl text-center text-white uppercase -mt-16 font-bold'>Shoup</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="Cetegory" />
                    <h1 className='text-3xl text-center text-white uppercase -mt-16 font-bold'>Desert</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} alt="Cetegory" />
                    <h1 className='text-3xl text-center text-white uppercase -mt-16 font-bold'>Salad</h1>
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;