

import Navbar from "../../components/navbar";
import contactus from "../../images/contactus.png";


export default function ContactUs() {

    return (<section className="relative md:p-0 px-3 min-h-[97.7vh] md:min-h-[97vh]">
        <div className="md:w-[85%] mx-auto w-full">
            <Navbar />
            <main className="">
                <section className="flex flex-col items-center justify-center w-full gap-3 lg:flex-row">
                    <div className="w-full">
                        <img src={contactus} alt="contactus" />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <div className="w-full md:w-[35rem] border rounded-3xl  my-10 md:mt-10 shadow-md md:px-2 py-2 bg-white z-30">
                            <div className="flex items-start justify-start w-full ">
                                <div className="w-full p-3 space-y-5 ">
                                    <div>
                                        <h2 className="text-[28px] mb-2 font-semibold">Contact Us</h2>

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2 md:flex-row">
                                            <div className="w-full">
                                                <label
                                                    htmlFor="fname"
                                                    className="block text-sm font-normal text-gray-500"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fname"
                                                    placeholder="Enter First Name"
                                                    className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    htmlFor="lname"
                                                    className="block text-sm font-normal text-gray-500"
                                                >
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lname"
                                                    placeholder="Enter Last Name"
                                                    className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 md:flex-row">
                                            <div className="w-full">
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-normal text-gray-500"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="Enter Email"
                                                    className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    htmlFor="contact"
                                                    className="block text-sm font-normal text-gray-500"
                                                >
                                                    Contact Number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="contact"
                                                    placeholder="Enter Contact Number"
                                                    className="w-full px-3 py-3 mt-1 text-base font-normal border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="detail"
                                                className="block text-sm font-normal text-gray-500"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                type="detail"
                                                id="detail"
                                               
                                                placeholder="Enter Message"
                                                className="w-full px-3 py-3 mt-1 overflow-y-scroll text-base font-normal border border-gray-300 rounded-md cursor-pointer selectDropdown h-28 focus:outline-none focus:ring focus:border-green-400 focus:bg-white"
                                            />
                                        </div>


                                    </div>

                                    <div className="pt-5">
                                        <button className="w-full py-3 text-base font-medium text-white rounded-md bg-customGreen ">
                                            Save
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </section>
    )


}