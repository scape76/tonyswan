"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricForm } from "./MetricForm";
import { USForm } from "./USForm";
import { trpc } from "@/app/_trpc/client";
import { BioData } from "@/lib/db";

const BiodataForm = ({ data }: { data: BioData | null }) => {
  return (
    <Tabs defaultValue="metric">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px] mt-4">
        <TabsTrigger value="metric">Metric Units</TabsTrigger>
        <TabsTrigger value="us">US Units</TabsTrigger>
      </TabsList>
      <TabsContent value="metric" className="w-full">
        <MetricForm data={data} />
      </TabsContent>
      <TabsContent value="us">
        <USForm data={data} />
      </TabsContent>
    </Tabs>
  );
};

export { BiodataForm };
