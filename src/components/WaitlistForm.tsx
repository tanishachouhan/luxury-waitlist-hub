import { useState, forwardRef } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { NeighborhoodPills } from "./NeighborhoodPills";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  moveInDate: z.date({ required_error: "Please select a move-in date" }),
  budgetRange: z.string({ required_error: "Please select a budget range" }),
  neighborhoods: z.array(z.string()).min(1, "Please select at least one neighborhood"),
});

type FormData = z.infer<typeof formSchema>;

const BUDGET_RANGES = [
  { value: "2k-3k", label: "$2,000 - $3,000" },
  { value: "3k-5k", label: "$3,000 - $5,000" },
  { value: "5k+", label: "$5,000+" },
];

const NEIGHBORHOODS = [
  "Tribeca",
  "SoHo",
  "Chelsea",
  "Upper East Side",
  "Upper West Side",
  "Financial District",
  "West Village",
  "Greenwich Village",
  "Midtown",
  "Brooklyn Heights",
];

export const WaitlistForm = forwardRef<HTMLInputElement>((_, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      neighborhoods: [],
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        move_in_date: format(data.moveInDate, "yyyy-MM-dd"),
        budget_range: data.budgetRange,
        neighborhoods: data.neighborhoods,
      });

      if (error) throw error;

      // Send email notification (fire and forget, don't block success)
      supabase.functions.invoke("send-lead-notification", {
        body: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          budgetRange: data.budgetRange,
          moveInDate: format(data.moveInDate, "yyyy-MM-dd"),
          neighborhoods: data.neighborhoods,
        },
      }).catch((err) => console.error("Failed to send notification:", err));

      setIsSuccess(true);
      toast({
        title: "You're on the list!",
        description: "We'll be in touch soon with exclusive opportunities.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">You're on the list!</h3>
        <p className="text-muted-foreground">
          We'll reach out when a property matching your preferences becomes available.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} ref={ref} />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(212) 555-0123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="moveInDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Desired Move-in Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : "Select a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budgetRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Range</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhoods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Neighborhoods</FormLabel>
              <FormControl>
                <NeighborhoodPills
                  options={NEIGHBORHOODS}
                  selected={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>
    </Form>
  );
});

WaitlistForm.displayName = "WaitlistForm";
