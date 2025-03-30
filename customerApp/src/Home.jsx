import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Loader from './Loader';

const Home = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [searchedUser, setSearchedUser] = useState({
        name: ""
    })
    const [oneUser, setOneUser] = useState([]);
    const [searchOn, setSearchOn] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        medicine: "",
        phoneNumber: "",
        disease: "",
        address: "",
        date: "",
        price: ""
    })
    const [userLogin, setUserLogin] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem("userToken")
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/userDetails`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setUserInfo(response.data.allUsersMine)
            // console.log(response.data.allUsersMine);
        } catch (error) {
            console.log("Eroor...")
        }
    }

    const searchUser = async () => {
        const token = localStorage.getItem("userToken")
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/searchedUser`, searchedUser,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setOneUser(response.data.user)
            // console.log(response.data.user);
            setTimeout(() => {
                setSearchOn(true)
            }, 500);
        } catch (error) {
            console.log("Error...")
        }
    }

    const createUser = async () => {
        const token = localStorage.getItem("userToken")
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/createUser`, newUser,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            fetchUser();
            setFormOpen(false);
            window.location.reload();
        } catch (error) {
            console.log("Error adding...")
        }
    }

    const userLogined = async () => {
        if (localStorage.getItem("userToken")) {
            setUserLogin(true);
        } else {
            setUserLogin(false);
        }
    }

    useEffect(() => {
        fetchUser();
        userLogined();
    }, [])

    return (
        <>
            <Navbar setUserLogin={setUserLogin} />
            {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
            {userLogin ? (
                <div className=''>
                    <div className='flex flex-col justify-center items-center mt-30 gap-5 mb-10'>
                        <div className='flex w-[80vw] gap-4 justify-center'>
                            <input
                                type="text"
                                name="customer"
                                required
                                placeholder='Enter Customer Name...'
                                onChange={(e) => setSearchedUser({ ...searchedUser, name: e.target.value })}
                                className='w-[73vw] rounded-md p-2 bg-blue-100 border border-black outline-none focus:ring-0 focus:border-black'
                            />
                            <button onClick={searchUser} className='bg-green-300 hover:bg-green-400 cursor-pointer transition duration-300 rounded-md py-1 px-4 text-xl text-white'>Search</button>
                        </div>

                        {searchOn ? (<div className="bg-white rounded-lg shadow w-[90vw]">
                            <div className="overflow-x-auto">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">Searched Customer</h2>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Condition
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Prescribed Medicine
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                Date
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                Phone Number
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {oneUser.map((item) => (
                                            <tr key={item._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        {item.disease}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.medicine}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.price}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {new Date(item.date).toLocaleDateString()}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {item.phoneNumber}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {item.address}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        ) : (
                            <div></div>
                        )}

                        <div className="bg-white rounded-lg shadow w-[90vw]">
                            <div className="overflow-x-auto">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-1"> <Users className="text-blue-600" />Customer Records</h2>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Condition
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Prescribed Medicine
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                Date
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                Phone Number
                                            </th>
                                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                                Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {userInfo?.length > 0 ? (
                                            userInfo.map((item) => (
                                                <tr key={item._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                            {item.disease}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.medicine}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.price}
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                        {item.phoneNumber}
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                        {item.address}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (<div></div>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {formOpen ? (
                            <form className='bg-white rounded-lg shadow w-[90vw] p-5 mt-5'>
                                <h2 className="text-xl font-semibold text-gray-800">Customer Details</h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                                    <input required type="text" name="name" placeholder='Customer Name' onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className='p-2 border rounded-md' />
                                    <input required type="text" name="disease" placeholder='Condition' onChange={(e) => setNewUser({ ...newUser, disease: e.target.value })} className='p-2 border rounded-md' />
                                    <input required type="text" name="medicine" placeholder='Prescribed Medicine' onChange={(e) => setNewUser({ ...newUser, medicine: e.target.value })} className='p-2 border rounded-md' />
                                    <input required type="date" name="date" onChange={(e) => setNewUser({ ...newUser, date: e.target.value })} className='p-2 border rounded-md' />
                                    <input required type="tel" name="phoneNumber" placeholder='Phone Number' onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} className='p-2 border rounded-md' />
                                    <input required type="text" name="address" placeholder='Address' onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} className='p-2 border rounded-md' />
                                    <input type="text" name="price" placeholder='Price' onChange={(e) => setNewUser({ ...newUser, price: e.target.value })} className='p-2 border rounded-md' />
                                </div>
                                <button onClick={createUser} className='bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer'>Add Customer</button>
                            </form>
                        ) : (
                            <div></div>
                        )}

                        {formOpen ? (<div></div>) : (<div className='addButton' onClick={() => { setFormOpen(true); console.log("open") }}>
                            <button className='bg-blue-300 rounded-md py-2 px-3 cursor-pointer hover:bg-blue-400 transition duration-200'>Customer Add On</button>
                        </div>)}
                    </div>
                    <ToastContainer />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <div className="bg-blue-100 rounded-lg shadow-lg p-8 mt-6 w-full max-w-3xl text-center relative">
                        <h1 className="text-3xl font-bold text-green-700">
                            Ancient Wisdom for Modern Wellness
                        </h1>
                        <p className="text-gray-600 mt-3">
                            Discover the healing power of traditional Ayurvedic medicine, carefully
                            crafted to restore balance and promote natural healing.
                        </p>
                    </div>
                </div>
            )}

        </>
    )
}

export default Home