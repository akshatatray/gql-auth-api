import React, { useState } from "react";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import Navbar from "../../components/Navbar/Navbar";
import { useUsersQuery } from "../../generated/graphql";

const Home : React.FC = () => {
    const {loading, error, data} = useUsersQuery({
        fetchPolicy: "network-only",
    });
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }

    if (loading) {
        return (
            <div>
                <Navbar toggleNav={toggleNav} />
                <MobileNavbar isOpen={isOpen} toggleNav={toggleNav} />
                <div>Loading...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div>
                <Navbar toggleNav={toggleNav} />
                <MobileNavbar isOpen={isOpen} toggleNav={toggleNav} />
                <div>{JSON.stringify(error)}</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar toggleNav={toggleNav}/>
            <MobileNavbar isOpen={isOpen} toggleNav={toggleNav}/>
            <ul>
                {
                    data.users.map((user) => {
                        return (
                            <li key={user.id}>
                                {user.id}: {user.email}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

export default Home;
