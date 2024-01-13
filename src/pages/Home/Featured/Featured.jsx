import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import FeaturedImg from '../../../assets/home/featured.jpg'
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featuredImg bg-fixed text-white pt-8 my-20 ">
            <SectionTitle
                subHeading="check it out"
                heading="Featured Item">
            </SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-8 px-36 bg-slate-500 bg-opacity-35">
                <div>
                    <img className="rounded-md" src={FeaturedImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Sep 20,2024</p>
                    <p className="uppercase">Whare can i  get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel architecto mollitia laborum ad! Placeat, mollitia voluptates nesciunt ducimus sunt quae fuga rerum commodi ab enim eligendi, iusto, laboriosam corporis modi aperiam! Cumque unde quisquam sint, explicabo ratione esse vel incidunt?</p>

                </div>
            </div>


        </div>
    );
};

export default Featured;