import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

const Vans = () => {
    const [vans, setVans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");

    useEffect(() => {
        const loadVans = async () => {
            setLoading(true);
            try {
                const data = await getVans();
                setVans(data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        loadVans();
    }, []);

    const displayedVans = typeFilter
        ? vans?.filter((van) => van.type === typeFilter)
        : vans;

    const handleFilterChange = (key, value) => {
        setSearchParams((prevSearchParams) => {
            if (!value) {
                prevSearchParams.delete(key);
            } else {
                prevSearchParams.set(key, value);
            }
            return prevSearchParams;
        });
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Something went wrong!</h1>;
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>

            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={`van-type simple ${
                        typeFilter === "simple" ? "selected" : ""
                    }`}
                >
                    Simple
                </button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${
                        typeFilter === "luxury" ? "selected" : ""
                    }`}
                >
                    Luxury
                </button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={`van-type rugged ${
                        typeFilter === "rugged" ? "selected" : ""
                    }`}
                >
                    Rugged
                </button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >
                        Clear filter
                    </button>
                ) : null}
            </div>

            <div className="van-list">
                {displayedVans?.map((van) => (
                    <div key={van.id} className="van-tile">
                        <Link
                            to={van.id}
                            state={{
                                search: `?${searchParams.toString()}`,
                                type: typeFilter,
                            }}
                        >
                            <img src={van.imageUrl} />
                            <div className="van-info">
                                <h3>{van.name}</h3>
                                <p>
                                    ${van.price}
                                    <span>/day</span>
                                </p>
                            </div>
                            <i className={`van-type ${van.type} selected`}>
                                {van.type}
                            </i>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vans;