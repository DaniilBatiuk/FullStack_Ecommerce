import React, { useState } from "react";
import "../styles/CreateProduct.scss";
import MyInput from "./UI/Modal/Input/MyInput";
import MyButton from "./UI/Modal/Button/MyButton";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./UI/Modal/Modal";
import { Product } from "../types/types";
import { fetchCreateProduct } from "../redux/slices/products";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";

export interface CreateProductProps {
    active: boolean;
    setActive: (isActive: boolean) => void;
}


const CreateProduct: React.FC<CreateProductProps> = ({ active, setActive }: CreateProductProps) => {
    const dispatch = useAppDispatch();
    const { types } = useSelector((state: RootState) => state.type);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();
    const onSubmit: SubmitHandler<Product> = (data: Product) => {
        console.log(data);
        // dispatch(fetchCreateProduct(data))
        //     .unwrap()
        //     .then((response) => {
        //         setError(false);
        //     })
        //     .catch((error) => {
        //         setError(true);
        //         setErrorMessage(error[0]?.msg);
        //     });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Modal active={active}>
                <div className="modal__header">
                    <div className="modal__title title">Create Product</div>
                    <svg onClick={() => setActive(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
                </div>
                {((errors.title || errors.price) && !error) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            All fields must be filled
                        </div>
                    </div>
                )}
                {(error) && (
                    <div className="alert alert-danger" role="alert">
                        <div>
                            {errorMessage}
                        </div>
                    </div>
                )}
                <div className="modal__label">Title</div>
                <MyInput type="text" placeholder="Enter title" label="title" register={register} required />
                <div className="modal__label">Price</div>
                <MyInput type="text" placeholder="Enter price" label="price" register={register} required />
                <div className="modal__label">Gender Selection</div>
                <select {...register("type")} className="form-select">
                    {(types.length !== 0) && (
                        types.map((type) => (
                            <option key={type._id} value={type.name}>{type.name}</option>))
                    )}
                </select>
                <div className="modal__label">Images</div>
                <input className="form-control" type="file"  {...register("img")} required multiple />
                <MyButton type="submit" value="Create Product" />
            </Modal>
        </form>
    );
};

export default CreateProduct;