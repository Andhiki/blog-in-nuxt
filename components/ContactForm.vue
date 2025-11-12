<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "vue-sonner";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  isSubmitting.value = true;

  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    });

    toast.success("Message sent successfully!");
    form.name = "";
    form.email = "";
    form.message = "";
  } catch (error: any) {
    toast.error(error.data?.message || "Failed to send message. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form @submit="handleSubmit" class="space-y-6">
    <div class="space-y-2">
      <Label for="name">Name</Label>
      <Input
        id="name"
        v-model="form.name"
        type="text"
        placeholder="Your name"
        required
      />
    </div>

    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="your.email@example.com"
        required
      />
    </div>

    <div class="space-y-2">
      <Label for="message">Message</Label>
      <Textarea
        id="message"
        v-model="form.message"
        placeholder="Your message..."
        rows="6"
        required
      />
    </div>

    <Button type="submit" :disabled="isSubmitting" class="w-full">
      {{ isSubmitting ? "Sending..." : "Send Message" }}
    </Button>
  </form>
</template>

