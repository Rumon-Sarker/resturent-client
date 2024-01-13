import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {

        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imagUrl = imgResponse.data.display_url;
                    const { name, price, category, recipe } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imagUrl }
                    console.log(newItem);
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Items Added Success",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                            console.log(data.data)
                        })
                }
            })
    };
    console.log(img_hosting_token)

    console.log(errors);
    return (
        <div className="w-full px-10">
            <SectionTitle subHeading="What new" heading="Add an item"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </div>
                    <input type="text" name="name"  {...register("name", { required: true, maxLength: 120 })} placeholder="Type here" className="input input-bordered w-full " />

                </label>

                <div className="flex my-10">
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Category</span>
                        </div>
                        <select defaultValue={"Pick One"} {...register("category", { required: true })} className="select select-bordered">
                            <option disabled >Pick one</option>
                            <option>pizza</option>
                            <option>soup</option>
                            <option>salad</option>
                            <option>drinks</option>
                            <option>reguler</option>
                            <option>deserts</option>
                        </select>
                    </label>

                    <label className="form-control w-full ml-5 ">
                        <div className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </div>
                        <input type="number" name="price" {...register("price", { required: true, maxLength: 120 })} placeholder="Type here" className="input input-bordered w-full " />

                    </label>

                </div>

                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Recipe Details</span>

                    </div>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                </label>


                <label className="form-control w-full max-w-xs ">
                    <div className="label">
                        <span className="label-text">Items Image</span>
                    </div>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </label>

                <button className="btn mt-4 hover:bg-orange-400 bg-slate-400 btn-sm" type="submit">Add Items</button>
            </form>
        </div>
    );
};

export default AddItem;