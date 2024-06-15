"use client";

import { createAndEditJobSchema, CreateAndEditJobType, JobMode, JobStatus } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField, { CustomFormSelect } from "./FormComponents";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const CreateJobForm = () => {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />

          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />

          <CustomFormSelect name="mode" control={form.control} labelText="job mode" items={Object.values(JobMode)} />

          <Button type="submit" disabled={form.formState.isSubmitting} className="self-end capitalize">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
