"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
  useToast,
} from "@tonyswan/ui";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { biodataSchema } from "@/utils/schema/diet";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "@tonyswan/ui/icons";
import type { BioData } from "@tonyswan/db";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof biodataSchema>;

function MetricForm({ data }: { data: BioData | null | undefined }) {
  const router = useRouter();

  const { toast } = useToast();

  const { mutate, isLoading } = trpc.diet.saveBiodata.useMutation({
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success.",
        description: "Your biodata was saved.",
      });

      router.refresh();
    },
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(biodataSchema),
    defaultValues: {
      age: data?.age,
      gender: data?.gender,
      height: data?.height,
      weight: data?.weight,
    },
  });

  const onSubmit = (vals: Inputs) => {
    mutate({ ...vals });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} className="pr-14" />
                  <span className="absolute right-[8px] top-[6px] text-muted-foreground">
                    years
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FEMALE">female</SelectItem>
                    <SelectItem value="MALE">male</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <FormControl>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pr-[38px]" />
                    <span className="absolute right-[8px] top-[6px] text-muted-foreground">
                      cm
                    </span>
                  </div>
                </FormControl>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pr-[38px]" />
                    <span className="absolute right-[8px] top-[6px] text-muted-foreground">
                      kg
                    </span>
                  </div>
                </FormControl>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
}

export { MetricForm };
