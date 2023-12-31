import { useOutletContext } from "react-router-dom";

const HostVanInfo = () => {
    const { currVan } = useOutletContext();

    return (
        <section className="host-van-detail-info">
            <h4>
                Name: <span>{currVan.name}</span>
            </h4>
            <h4>
                Category: <span>{currVan.type}</span>
            </h4>
            <h4>
                Description: <span>{currVan.description}</span>
            </h4>
            <h4>
                Visibility: <span>Public</span>
            </h4>
        </section>
    );
};

export default HostVanInfo;
