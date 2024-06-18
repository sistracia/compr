"use client";

import { DetailPage } from "@repo/hugof-ui/detail-page";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/form-ui/ui/resizable";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@repo/form-ui/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/form-ui/ui/form";
import { Input } from "@repo/form-ui/ui/input";
import { Textarea } from "@repo/form-ui/ui/textarea";

const formSchema = z.object({
  slug: z.string().min(1, { message: "Slug required." }).regex(/^\S*$/, {
    message: "Slug cannot have any whitespace.",
  }),
  subtitle: z
    .string()
    .min(1, { message: "Subtitle required." })
    .regex(/^(?!\s).*(?<!\s)$/, {
      message: "Subtitle cannot start or end with whitespace.",
    }),
  title: z
    .string()
    .min(1, { message: "Title required." })
    .regex(/^(?!\s).*(?<!\s)$/, {
      message: "Title cannot start or end with whitespace.",
    }),
});

export type ContentFromSchema = z.infer<typeof formSchema>;

export type ContentFormProps = {
  defaulValues?: ContentFromSchema;
  createContent?: (value: ContentFromSchema) => Promise<void>;
};

export function ContentForm({ defaulValues, createContent }: ContentFormProps) {
  const form = useForm<ContentFromSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaulValues || {
      slug: "",
      subtitle: "",
      title: "",
    },
  });

  const formData = form.watch();

  // 2. Define a submit handler.
  const onSubmit = (values: ContentFromSchema) => {
    createContent?.(values);
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="[&_*]:!animate-none [&_*]:!transition-none [&_*]:!delay-0 [&_*]:!duration-0">
          <DetailPage title={formData.title} subtitle={formData.subtitle} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Page subtitle here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Page subtitle here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Page Title here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
