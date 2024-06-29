"use client";
import React, { Fragment } from "react";
import axios from "axios";
// new
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const API_URL = process.env.API_URL ?? "http://localhost:8000";

enum Category {
  racket = "racket",
  shoes = "shoes",
  rubber = "rubber",
  jersey = "jersey",
  others = "others",
}

export default function Page() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const response = await axios.post(`${API_URL}/product/create`, form);
    console.log(response);
    if (response.data.message === "New product created") {
      alert("New product created");
      window.location.href = "/product";
      return;
    } else {
      alert("Error");
      return;
    }
  }
  // new
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <div className="m-10 px-80 overflow-y-hidden">
      <Form {...form}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormField
            control={form.control}
            name="username"
            render={() => (
              <FormItem>
                <FormLabel>品名:</FormLabel>
                <FormControl>
                  <Input name="name" />
                </FormControl>
                <FormLabel>廠牌: </FormLabel>
                <FormControl>
                  <Input name="brand" />
                </FormControl>
                <FormLabel>價格:</FormLabel>
                <FormControl>
                  <Input name="price" />
                </FormControl>
                <FormLabel>數量: </FormLabel>
                <FormControl>
                  <Input name="amount" />
                </FormControl>
                <FormLabel>顏色:</FormLabel>
                <FormControl>
                  <Select name="color">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">blue</SelectItem>
                      <SelectItem value="green">green</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormLabel>尺寸:</FormLabel>
                <FormControl>
                  <Select name="size">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormLabel>分類:</FormLabel>
                <FormControl>
                  <Select name="category">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Category.racket}>Racket</SelectItem>
                      <SelectItem value={Category.shoes}>Shoes</SelectItem>
                      <SelectItem value={Category.rubber}>Rubber</SelectItem>
                      <SelectItem value={Category.jersey}>Jersey</SelectItem>
                      <SelectItem value={Category.others}>Others</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormLabel>產品描述:</FormLabel>
                <FormControl>
                  <Textarea name="description" />
                </FormControl>
                <FormLabel>圖片:</FormLabel>
                <FormControl>
                  <Input name="image" type="file" multiple />
                </FormControl>
              </FormItem>
            )}
          />
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
