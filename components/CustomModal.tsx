import Modal from '@mui/material/Modal';
import {useRecoilState} from "recoil";
import {modalState, movieState} from "@/atoms/modalAtom";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {Element, Genre} from "@/typings";

const CustomModal = () => {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState<string>("")
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        if (!movie) return
        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=f48d76aa429cff3ea2b3b41ed7c1442a&language=en-US&append_to_response=videos`
            ).then((response) => response.json());

            if (data?.videos) {
                const index = data.videos.results.findIndex(
                    (element: Element) => element?.type === 'Trailer'
                )
                setTrailer(data.videos?.results[index]?.key)
            }
            if (data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()
    }, [movie])

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <Modal
            open={showModal}
            onClose={handleClose}>
            <>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}>
                    <XMarkIcon className="h-6 w-6"/>
                </button>

                <div>
                </div>
            </>
        </Modal>
    );
}

export default CustomModal;
