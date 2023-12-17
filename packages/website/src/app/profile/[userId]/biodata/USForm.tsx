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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@tonyswan/ui";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usBiodataSchema } from "@/utils/schema/diet";
import type { BioData } from "@tonyswan/db";
import { useMemo } from "react";
import { trpc } from "@/app/_trpc/client";
import {
  dietConfig,
  kgsToPounds,
  cantimeresToInches,
  feetAndInchesToCantimeters,
  poundsToKgs,
} from "@/utils/dietConfig";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof usBiodataSchema>;

function USForm({ data }: { data: BioData | null | undefined }) {
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

  const [feet, inches] = useMemo(() => {
    if (!data?.height) return [];
    const fullInches = cantimeresToInches(data.height);

    const fullFeet = fullInches / dietConfig.inchesInFeet;

    const feet = Math.floor(fullFeet);
    const inches = Math.round((fullFeet - feet) * dietConfig.inchesInFeet);

    return [feet, inches];
  }, [data?.height]);

  const form = useForm<Inputs>({
    resolver: zodResolver(usBiodataSchema),
    defaultValues: {
      age: data?.age,
      gender: data?.gender,
      feet,
      inches,
      weight: data?.weight && Math.round(kgsToPounds(data.weight)),
    },
  });

  const onSubmit = (vals: Inputs) => {
    const height = Math.round(
      feetAndInchesToCantimeters(vals.feet, vals.inches)
    );
    const weight = Math.round(poundsToKgs(vals.weight));

    mutate({
      age: vals.age,
      gender: vals.gender,
      weight,
      height,
    });
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

        <div>
          <Label>Height</Label>
          <div className="flex w-full gap-2 mt-2">
            <FormField
              control={form.control}
              name="feet"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} className="pr-[42px]" />
                        <span className="absolute right-[8px] top-[6px] text-muted-foreground">
                          feet
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
              name="inches"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} className="pr-16" />
                        <span className="absolute right-[8px] top-[6px] text-muted-foreground">
                          inches
                        </span>
                      </div>
                    </FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pr-14" />
                    <span className="absolute right-[8px] top-[6px] text-muted-foreground">
                      pounds
                    </span>
                  </div>
                </FormControl>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}

export { USForm };
