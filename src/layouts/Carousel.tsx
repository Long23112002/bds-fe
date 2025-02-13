import '../layouts/styles/corousel.css';
import Search from './searchs/Search';

const Carousel = () => {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://tpc.googlesyndication.com/simgad/4675260543420533076" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://tpc.googlesyndication.com/simgad/4675260543420533076" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://tpc.googlesyndication.com/simgad/4675260543420533076" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Tab section */}
            <Search />
        </>
    )
}

export default Carousel;
