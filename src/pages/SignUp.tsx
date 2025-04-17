
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';

const programmingLanguages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'Rust', 'PHP', 'Swift',
  'Kotlin', 'C#', 'Scala', 'Dart', 'R', 'Objective-C', 'Perl', 'Lua', 'Shell', 'Haskell', 'Julia',
  'Matlab', 'Elixir', 'Lua', 'Clojure', 'F#', 'VHDL', 'ActionScript', 'Crystal', 'Zig', 'Tcl', 'GDScript',
  'OCaml', 'Vala', 'Hack', 'Move', 'Nim', 'Solidity', 'Verilog', 'D', 'Groovy', 'SAS', 'Smalltalk', 'Sui Move', 'Ceylon', 'Mercury'
];


const telRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  tel: z.string().regex(telRegex, {message: 'Invalid phone number format'}),
  wallet: z.string().min(32, {message: 'Invalid wallet address'}),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  user_type: z.string(),
  role: z.string().optional(),
  stack: z.array(z.string()).optional(),
  graduate: z.boolean(),
  level: z.string().refine(value => !isNaN(Number(value)), {
    message: 'Level must be a valid number',
  }),
  department: z.string().optional(),
  university: z.string().optional(),
  student: z.string().optional(),
  attending_events: z.array(z.string()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { signup, signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      tel: '',
      wallet: '',
      password: '',
      confirmPassword: '',
      user_type: '',
      role: '',
      stack: [],
      graduate: false,
      level: '',
      department: '',
      university: '',
      student: '',
    },
  });

  // const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const searchRef = useRef(null); // Ref for the entire search section

  // Filter the languages based on the search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredLanguages(
        programmingLanguages.filter(language =>
          language.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredLanguages([]);
    }
  }, [searchQuery]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown when clicking outside
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Handle adding/removing programming languages
  const handleAddLanguage = (language: string) => {
    const currentStack = form.getValues('stack');

    // check if the lang in stack
    if (!currentStack.includes(language)) {
      const updatedLanguages = [...currentStack, language];
      form.setValue('stack', updatedLanguages); // sync with form state
      setSearchQuery('');
      setIsDropdownOpen(false); // Close the dropdown after selection

    } else {
      alert(`${language} stack already added`)
    }
  };

  const handleRemoveLanguage = (language: string) => {
    const updatedLanguages = form.getValues('stack').filter((lang) => lang !== language);
    form.setValue('stack', updatedLanguages); // Syncing with form state
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(true); // Open the dropdown when user types
    setFilteredLanguages(programmingLanguages.filter((lang) => lang.toLowerCase().includes(value.toLowerCase())));
  };

  const userType = form.watch('user_type');
  const isCoreTeam = userType === "coreteam";

  const graduate = form.watch('graduate');
  const isGraduate = graduate === true;



  const onSubmit = async (values: SignUpFormValues) => {
    
    try {
    
      // log the values
      console.log(values)
      // Updated signup function call with all the required fields
    await signup(
      values.name,              // name
      values.email, 
      values.tel,            // email
      values.wallet,            // wallet
      values.password,          // password
      values.stack,             // stack (skills)
      values.graduate,          // graduate (boolean)
      values.user_type,         // user_type
      values.role,              // role (if any)
      values.level,             // level
      values.department,        // department
      values.university,        // university
      values.student,           // student (if applicable)
      []  // attending_events (if any)
    );
      
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Sign up failed',
        description: `${error}`,
        variant: 'destructive',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: 'Sign in successful',
        description: 'Welcome to Sui On Campus!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Google sign in failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-32 flex justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-sm border">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground mt-2">Join Sui On Campus</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tel"
                render={({ field })=> (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+xyz ######### " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
               />

              <FormField
              control={form.control}
              name="wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet</FormLabel>
                  <FormControl>
                    <Input placeholder='0x################################' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              {/* User Type */}
              <FormField
                control={form.control}
                name="user_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="random">Random</SelectItem>
                          <SelectItem value="hacker">Hacker</SelectItem>
                          {/* <SelectItem value="coreteam">Coreteam</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            {!isCoreTeam && (
              <>
              <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={value => field.onChange(value)} 
                    value={field.value || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="smartcontract-dev">Smartcontract dev</SelectItem>
                        <SelectItem value="product-manager">Product manager</SelectItem>
                        <SelectItem value="uiux">UIUX</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField control={form.control} name="stack" render={({ field }) => (
              <FormItem>
                <FormLabel>Enter stack</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {/* Render selected language chips */}
                    {form.getValues('stack').map((language) => (
                      <Chip
                        key={language}
                        label={language}
                        onDelete={() => handleRemoveLanguage(language)}
                      />
                    ))}

                    

                    {/* Input field for search */}
                    <Input
                    {...field}
                      placeholder="Enter a programming Language </>"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full"
                    />

                    {/* Autocomplete Suggestions */}
                    {isDropdownOpen && searchQuery && filteredLanguages.length > 0 && (
                      <div className="absolute bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto w-full">
                        {filteredLanguages.map((language) => (
                          <div
                            key={language}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleAddLanguage(language)}
                          >
                            {language}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="graduate"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 mt-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium leading-none">
                  I confirm that I am a graduate
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
                          control={form.control}
                          name="university"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>University</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter the name of your school" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

<FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deprtment</FormLabel>
                              <FormControl>
                                <Input placeholder="Mathematics, Mechanical engineering..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

<FormField
                          control={form.control}
                          name="student"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Student Club</FormLabel>
                              <FormControl>
                                <Input placeholder="SOCSC UNIBEN, etc..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                    {!isGraduate && (
                      <>
                      <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => field.onChange(value)}  // value will be a string
                              value={String(field.value) || ''}  // Ensure value is always a string
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="100">100</SelectItem>
                                <SelectItem value="200">200</SelectItem>
                                <SelectItem value="300">300</SelectItem>
                                <SelectItem value="400">400</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                                <SelectItem value="600">600</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      </>
                    )}

              </>
            )}

          




              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="**********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="**********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={true}
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Sign up with Google
          </Button>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
