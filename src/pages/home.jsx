import { Link } from 'react-router';

const Home = () => {
    return (
        <div className='test'>
            <p>Hello World</p>
            <Link to='/contact' className="text-blue-600 underline">Contact</Link>
            {/* <i className="fa-solid fa-image"></i> */}
        </div>
    )
}

export default Home;