const Footer = () => {
    return (
        <footer className="bg-primary-800 shadow text-white py-4">
            <div className="max-w-screen-2xl mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} Sport Booking. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;