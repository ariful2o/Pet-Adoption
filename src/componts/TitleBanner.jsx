import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function TitleBanner({ section, image }) {

    return (
        <div
            className="hero h-80"
            style={{
                backgroundImage: `url(${image})`,
            }}>
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{section}</h1>
                    <div className="breadcrumbs text-md">
                        <ul className='gap-4'>
                            <NavLink to="/"><li>Home</li></NavLink>
                            <li>{section}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


TitleBanner.propTypes = {
    section: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}