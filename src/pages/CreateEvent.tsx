import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { createEvent } from "@/data/events";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {DatePicker} from "@heroui/date-picker";
import {TimeInput} from "@heroui/date-input";
import {Time} from "@internationalized/date";



const createEventSchema = z.object({
  name: z.string(),
  location: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z.string(),
  event_type: z.string().min(2, { message: 'event type must not be empty' }),
  start_time: z.date(),
  end_time: z.date()
})

type createEventFormValues = z.infer<typeof createEventSchema>;

const CreateEvent = () => {
    const placements = ["inside", "outside", "outside-left"];
    const { signup, signInWithGoogle, isLoading } = useAuth();
      const navigate = useNavigate();
    
      const form = useForm<createEventFormValues>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
          name: '',
          location: '',
          description: '',
          event_type: '',
          start_time: new Date(Date.now()),
          end_time: new Date(Date.now()),
        },
      });

      const onCreate = async (value: createEventFormValues) => {
        try {
            console.log(value)

            await createEvent(value.name, value.location, "", value.description, 
                value.event_type, value.start_time.toISOString(),
                value.end_time.toISOString()
            )
            navigate('/event/:eventId')
        }catch (error){
            toast.error(`creation of event failed`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
        }
      }
      
    return (
        <div>
            <Header />
            <main className="flex-1 pt-16 md:pt-24 pb-16">
                <div className="container px-4 sm:px-6">
                    <div className="">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <div className="row">
                                <div className="col-md-5 px-3">
                                    <img
                                        src="https://images.pexels.com/photos/25626434/pexels-photo-25626434/free-photo-of-imaging-of-tokenization.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="event"
                                        className="rounded-md object-cover w-full h-full"
                                    />
                                    <button 
        // onClick={triggerFileInput}
        className="w-full mt-2 bg-zinc-200 text-black font-semibold py-2 rounded-lg hover:bg-zinc-300 transition"
        // disabled={uploadingImage}
      >
        {/* {uploadingImage ? 'Uploading...' : 'Upload'} */}upload
      </button>
                                </div>
                                <div className="col-md-7">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onCreate)} className="space-y-6">
                                            <FormField 
                                            control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                    <Input className="!text-4xl !font-semibold placeholder:text-3xl tracking-wide text-gray-800 bg-transparent !border-none focus:!border-none focus-visible:!border-none focus:!ring-0 focus-visible:!ring-0 focus:!outline-none focus-visible:!outline-none"
                                                    placeholder="Your name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                )}
                                            />

                                            <div className="flex w-full items-end gap-4 mb-6">
  <DatePicker
    className="w-1/2"
    description=""
    label="Start time"
    labelPlacement="outside"
  />

  <div className="w-1/2">
    <TimeInput label="Event Time" />
  </div>
</div>


                                        </form>
                                    </Form>

                                    
                                </div>
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CreateEvent;