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
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { Time, CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
import { Button } from "@heroui/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from 'react';
import useImageUploader from "@/components/ImageUploader";
// import useImageUploader from "./useImageUploader"; // Import the custom hook

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
    const { isLoading, user } = useAuth();
    const navigate = useNavigate();
    
    
    // Image state
    const [imagePreview, setImagePreview] = useState("https://res.cloudinary.com/georgegoldman/image/upload/c_thumb,w_200,g_face/v1747747289/suioncampus/SOC_LOGO_czms9t.jpg");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/georgegoldman/image/upload/c_thumb,w_200,g_face/v1747747289/suioncampus/SOC_LOGO_czms9t.jpg");
    
    // Date and time state
    const [startDate, setStartDate] = useState<CalendarDate>(today(getLocalTimeZone()));
    const [startTime, setStartTime] = useState<Time>(new Time(new Date().getHours(), new Date().getMinutes()));
    const [endDate, setEndDate] = useState<CalendarDate>(today(getLocalTimeZone()));
    const [endTime, setEndTime] = useState<Time>(new Time(new Date().getHours() + 1, new Date().getMinutes()));
    
    // Initialize the image uploader hook
    const handleImageUploadSuccess = (url: string) => {
      setImagePreview(url);
      setImageUrl(url);
      console.log("hello")
      console.log(url)
      setUploadingImage(false);
    };
    
    const { FileInput, triggerFileInput, loading: imageLoading, error: imageError } = 
      useImageUploader(handleImageUploadSuccess);
    
    // Update the uploading state when the imageLoading changes
    useEffect(() => {
      setUploadingImage(imageLoading);
    }, [imageLoading]);
    
    const form = useForm<createEventFormValues>({
      resolver: zodResolver(createEventSchema),
      defaultValues: {
        name: '',
        location: '',
        description: '',
        event_type: '',
        start_time: new Date(),
        end_time: new Date(),
      },
    });

    // Convert CalendarDate to JavaScript Date
    const calendarDateToJSDate = (date: CalendarDate): Date => {
      return new Date(date.year, date.month - 1, date.day);
    };

    // Update form values when date or time changes
    useEffect(() => {
      const jsStartDate = calendarDateToJSDate(startDate);
      jsStartDate.setHours(startTime.hour);
      jsStartDate.setMinutes(startTime.minute);
      form.setValue('start_time', jsStartDate);
      
      const jsEndDate = calendarDateToJSDate(endDate);
      jsEndDate.setHours(endTime.hour);
      jsEndDate.setMinutes(endTime.minute);
      form.setValue('end_time', jsEndDate);
    }, [startDate, startTime, endDate, endTime, form]);

    const handleStartDateChange = (date: CalendarDate) => {
      setStartDate(date);
    };

    const handleStartTimeChange = (time: Time) => {
      setStartTime(time);
    };

    const handleEndDateChange = (date: CalendarDate) => {
      setEndDate(date);
    };

    const handleEndTimeChange = (time: Time) => {
      setEndTime(time);
    };

    const onCreate = async (value: createEventFormValues) => {
      try {
        console.log(value);

        console.log(imageUrl)
        
        // Use the imageUrl from Cloudinary that was set after successful upload
        const eventId = await createEvent(
          value.name, 
          value.location, 
          imageUrl, // Use the saved Cloudinary URL
          user._id.$oid,
          value.description, 
          value.event_type, 
          value.start_time.toISOString(),
          value.end_time.toISOString(),
        );
        navigate(`/event/${eventId}`)
        // navigate('/event/:eventId');
      } catch (error) {
        toast.error(`Creation of event failed`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    };
      
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
                                      src={imagePreview}
                                      alt="event"
                                      className="rounded-md object-cover w-[300px] h-[200px]"
                                    />
                                    
                                    {/* Include the FileInput component from the hook */}
                                    <FileInput />
                                    
                                    <button 
                                      onClick={triggerFileInput}
                                      className="w-full mt-2 bg-zinc-200 text-black font-semibold py-2 rounded-lg hover:bg-zinc-300 transition"
                                      disabled={uploadingImage}
                                    >
                                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                                    </button>
                                    
                                    {imageError && (
                                      <p className="text-red-500 text-sm mt-1">{imageError}</p>
                                    )}
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
                                                    <Input className="!text-4xl !font-semibold placeholder:text-3xl 
                                                    tracking-wide text-gray-800 bg-transparent !border-none focus:!border-none focus-visible:!border-none focus:!ring-0 focus-visible:!ring-0 focus:!outline-none focus-visible:!outline-none"
                                                    placeholder="Event Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                )}
                                            />

                                            <div className="flex w-full items-end gap-4 mb-6">
                                                <DatePicker
                                                    className="w-1/2"
                                                    description=""
                                                    label="Start date"
                                                    labelPlacement="outside"
                                                    onChange={handleStartDateChange}
                                                    value={startDate}
                                                />

                                                <div className="w-1/2">
                                                    <TimeInput 
                                                      label="Start Time" 
                                                      value={startTime}
                                                      onChange={handleStartTimeChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full items-end gap-4 mb-6">
                                                <DatePicker
                                                    className="w-1/2"
                                                    description=""
                                                    label="End date"
                                                    labelPlacement="outside"
                                                    onChange={handleEndDateChange}
                                                    value={endDate}
                                                />

                                                <div className="w-1/2">
                                                    <TimeInput 
                                                      label="End Time"
                                                      value={endTime}
                                                      onChange={handleEndTimeChange}
                                                    />
                                                </div>
                                            </div>

                                            <FormField 
                                            control={form.control}
                                                name="location"
                                                render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                    <Input
                                                      className="text-lg font-semibold tracking-wide text-gray-800 bg-transparent border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                      {...field}
                                                    />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                )}
                                            />

                                            <FormField
                                              control={form.control}
                                              name="event_type"
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>Event Type</FormLabel>
                                                  <FormControl>
                                                    <Select 
                                                      onValueChange={value => field.onChange(value)} 
                                                      value={field.value || ''}
                                                    >
                                                      <SelectTrigger>
                                                        <SelectValue placeholder="Select Event type" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                        <SelectItem value="workshop">Workshop</SelectItem>
                                                        <SelectItem value="hackerthon">Hackerthon</SelectItem>
                                                        <SelectItem value="meetup">Meet up</SelectItem>
                                                      </SelectContent>
                                                    </Select>
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />

                                            <FormField
                                              control={form.control}
                                              name="description"
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>Description</FormLabel>
                                                  <FormControl>
                                                    <Textarea {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />

                                            <Button 
                                              type="submit" 
                                              className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                                              disabled={uploadingImage || isLoading}
                                            >
                                              {isLoading || uploadingImage ? 'Creating Event...' : 'Create Event'}
                                            </Button>
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