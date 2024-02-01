/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { getImgUrl } from "../utils/cine-utility";
import Rating from "./Rating";
import MovieDetailsModal from "./MovieDetailsModal";
import Tag from "../assets/tag.svg";
import { toast } from 'react-toastify';
import { MovieContext } from "../context";

export default function MovieCard({ movie }) {
    const [showModal, setShowModal] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const { state, dispatch } = useContext(MovieContext)

    function handleMovieSelection(movie) {
        setSelectedMovie(movie)
        setShowModal(true)
    }

    function handleModalClose() {
        setSelectedMovie(null)
        setShowModal(false);
    }

    function handleAddToCart(e, movie) {
        e.stopPropagation()

        const found = state.cartData.find((item) => item.id === movie.id)

        if (!found) {
            dispatch({
                type: 'added',
                payLoad: movie
            })
            toast.success(`${movie.title} added to cart!`, {
                position: 'bottom-right'
            })
        } else {
            toast.error(`The movie ${movie.title} has been added to the card already!`, {
                position: 'bottom-right'
            });
        }
    }

    return (
        <>
            {showModal && <MovieDetailsModal
                movie={selectedMovie}
                onClose={handleModalClose}
                onCartAdd={handleAddToCart}
            />}
            <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
                <a href="#" onClick={() => handleMovieSelection(movie)}>
                    <img className="w-full object-cover" src={getImgUrl(movie.cover)} alt="" />
                    <figcaption className="pt-4">
                        <h3 className="text-xl mb-1">{movie.title}</h3>
                        <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
                        <Rating rating={movie.rating} />
                        <button
                            className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
                            href="#"
                            onClick={(e) => handleAddToCart(e, movie)}
                        >
                            <img src={Tag} alt="Tag" />
                            <span>${movie.price} | Add to Cart</span>
                        </button>
                    </figcaption>
                </a>
            </figure>
        </>
    )
}
