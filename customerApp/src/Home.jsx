import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Users } from 'lucide-react'

const Home = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [searchedUser, setSearchedUser] = useState({
        name: ""
    })
    const [oneUser, setOneUser] = useState({});
    const [searchOn, setSearchOn] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/userDetails`);
            setUserInfo(response.data.user)
            console.log(response.data.user);
        } catch (error) {
            console.log("Eroor...")
        }
    }

    const searchUser = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/searchedUser`, searchedUser);
            setOneUser(response.data.user)
            console.log(response.data.user);
            setTimeout(() => {
                setSearchOn(true)
            }, 500);
        } catch (error) {
            console.log("Error...")
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            <div className=''>
                <div className='flex flex-col justify-center items-center mt-10 gap-5 mb-10'>
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
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr key={oneUser._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{oneUser.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                {oneUser.disease}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {oneUser.medicine}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                            {new Date(item.date).toLocaleDateString()}
                                        </td>
                                    </tr>
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
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {userInfo.map((item) => (
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
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home