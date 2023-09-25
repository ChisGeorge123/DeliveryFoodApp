import React, { useState, useEffect } from 'react';
import RestaurantService from '../services/restaurant.service';
import { useNavigate, useParams } from 'react-router-dom';

function CreateRestaurantComponent() {
    const { caenId} = useParams();
    const [dynamicCaenId, setDynamicCaenId] = useState(caenId);
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [poster, setPoster] = useState('');
    const [trailerLink, setTrailerLink] = useState('');
    const [menu, setMenu] = useState('');
    const [menuPrices, setMenuPrices] = useState('');
    const [backdrops, setBackdrops] = useState('');
    const [reviewIds, setReviewIds] = useState('');
    const [managerIds, setManagerIds] = useState('');
    const navigate = useNavigate();

    const isEditMode = Boolean(caenId);

    useEffect(() => {
        if (isEditMode) {
            RestaurantService.getRestaurantByCaenId(caenId).then((res) => {
                let restaurant = res.data;
                // setCaenId(restaurant.caenId)
                setTitle(restaurant.title);
                setReleaseDate(restaurant.releaseDate);
                setPoster(restaurant.poster);
                setTrailerLink(restaurant.trailerLink);
                setMenu(restaurant.menu.join(', '));
                setMenuPrices(restaurant.menuPrices.join(','));
                setBackdrops(restaurant.backdrops.join(','));
                if(restaurant.reviewIds!=null)setReviewIds(restaurant.reviewIds.join(','));
                if(restaurant.managerIds!=null)setManagerIds(restaurant.managerIds.join(','));
            });
        }
    }, [caenId, isEditMode]);

    const saveOrUpdateRestaurant = (e) => {
        e.preventDefault();
        const restaurant = {
            caenId:Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
            title,
            releaseDate,
            trailerLink,
            poster,
            menu: menu.split(', '),
            menuPrices: menuPrices.split(', '),
            backdrops: backdrops.split(', '),
            reviewIds: reviewIds.split(', '),
            managerIds: managerIds.split(', '),
        };

        if (isEditMode) {
            RestaurantService.updateRestaurant(restaurant, caenId).then(() => {
                navigate(`/admin/restaurant`);
            });
        } else {
            RestaurantService.createRestaurant(restaurant).then(() => {
                navigate('/admin/restaurant');
            });
        }
    };
    const handleInputChange = (event) => {
        setDynamicCaenId(event.target.value);
    };
    const cancel = () => {
        navigate('/admin/restaurant');
    };

    const getTitle = () => {
        return isEditMode ? (
            <h3 className="text-center">Update Restaurant</h3>
        ) : (
            <h3 className="text-center">Add Restaurant</h3>
        );
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                        <form>
                                
                                <div className="form-group">
                                    <label> Title: </label>
                                    <input
                                        placeholder="Title"
                                        name="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Release Date: </label>
                                    <input
                                        placeholder="ReleaseDate"
                                        name="releaseDate"
                                        className="form-control"
                                        value={releaseDate}
                                        onChange={(e) => setReleaseDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Trailer Link: </label>
                                    <input
                                        placeholder="TrailerLink"
                                        name="trailerLink"
                                        className="form-control"
                                        value={trailerLink}
                                        onChange={(e) => setTrailerLink(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Poster: </label>
                                    <input
                                        placeholder="Poster"
                                        name="poster"
                                        className="form-control"
                                        value={poster}
                                        onChange={(e) => setPoster(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Menu: </label>
                                    <input
                                        placeholder="Menu"
                                        name="menu"
                                        className="form-control"
                                        value={menu}
                                        onChange={(e) => setMenu(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Menu Prices: </label>
                                    <input
                                        placeholder="Menu Prices"
                                        name="menuPrices"
                                        className="form-control"
                                        value={menuPrices}
                                        onChange={(e) => setMenuPrices(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Backdrops: </label>
                                    <input
                                        placeholder="Backdrops"
                                        name="backdrops"
                                        className="form-control"
                                        value={backdrops}
                                        onChange={(e) => setBackdrops(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Review IDs: </label>
                                    <input
                                        placeholder="Review IDs"
                                        name="reviewIds"
                                        className="form-control"
                                        value={reviewIds}
                                        onChange={(e) => setReviewIds(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Manager IDs: </label>
                                    <input
                                        placeholder="Manager IDs"
                                        name="managerIds"
                                        className="form-control"
                                        value={managerIds}
                                        onChange={(e) => setManagerIds(e.target.value)}
                                    />
                                </div>
                                
                                <button className="btn btn-success" onClick={saveOrUpdateRestaurant}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRestaurantComponent;