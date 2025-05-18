import Header from "@/components/Header";
import { MapPin, Tag, Calendar, User } from 'lucide-react';

const ViewEvent = () => {
    return (
        <div>
            <Header />
            
            <main className="flex-1 pt-16 md:pt-24 pb-16">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-12">
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="row">
                                <div className="col-md-5 col-12 h-full lg:px-10 relative">
                                    <img
                                        src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=1,background=white,quality=75,width=400,height=400/event-covers/1e/f0a2a9f7-9bae-4fa3-b31a-d6db410aaabb.jpg"
                                        alt="event"
                                        className="rounded-md object-cover w-full h-full"
                                    />
                                    <p className="lg:py-2 lg:pt-5 pt-3 py-1"><strong>Hosted by</strong></p>
                                    <hr />
                                    <div className="d-flex justify-content-between py-2">
                                        <p>SUIONCAMPUS</p>
                                        <p><a href="https://x.com/suioncampus">X</a></p>
                                    </div>
                                    <a href="mailto:support@suioncampus.org">Contact the Host</a>
                                </div>

                                <div className="col-md-7 col-12 h-full lg:px-1 relative">
                                    <div className="w-full max-w-md">
                                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                                            SUI BUILDERTHON PORT HARCOURT
                                        </h1>
                                    </div>

                                    <div className="flex items-center mt-2">
                                          <Calendar className="mr-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 dark:text-gray-300" />
                                          <p className="text-xs sm:text-sm md:text-base">
                                                <span>Thursday 29 May</span> <br /> <span>10:00 - 31 May, 10:00</span>
                                            </p>

                                    </div>

                                    <div className="flex items-center mt-2 ">
                                          <MapPin className="mr-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 dark:text-gray-300" />
                                          <p className="text-[10px] sm:text-xs md:text-sm">
                                                <span>Port Harcourt</span> <br />
                                                <span>Rivers, Nigeria</span>
                                            </p>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-12"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ViewEvent;