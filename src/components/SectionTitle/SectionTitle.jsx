
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center md:w-4/12 mx-auto my-20 ">
            <p className="text-yellow-600 mb-4 font-md ">---{subHeading}---</p>
            <h1 className="text-4xl border-y-4 uppercase font-bold ">{heading}</h1>
        </div>
    );
};

export default SectionTitle;