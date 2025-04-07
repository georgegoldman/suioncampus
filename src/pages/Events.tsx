import Header from "@/components/Header";
import { useEffect } from "react"

const Events = () => {
    useEffect(() => {

    });

    return (
        <div>
            <Header />
            <main className="flex-1 pt-24 pb-16" >
                <div className="container px-5 sm:px-6">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div className="position-relative">
                            <div className="position-absolute top-0 start-0">
                                <div className="fs-1">Events</div>
                            </div>
                            <div className="position-absolute top-0 end-0">
                                <div className="">
                                    hi
                                </div>
                            </div>

                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Events;