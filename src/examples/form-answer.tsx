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
import {
  createDialogPromiser,
  PromiseComponentProps,
} from "@/demo/dialog-promise";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";

export function FormExample() {
  const askUserName = AskUserName.usePromise();
  const [username, setUsername] = useState<string | null>(null);

  const openDialog = useCallback(async () => {
    try {
      const result = await askUserName();
      console.log("SUCCESS");
      setUsername(result.name);
    } catch (error) {
      setUsername(null);
    }
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-xl">Form Example</h1>
      <div>Username: {username ?? "????"}</div>
      <Button onClick={openDialog}>Ask Username</Button>
    </div>
  );
}

const schema = z.object({ name: z.string().min(1) });
type FormData = z.infer<typeof schema>;

const AskUserName = createDialogPromiser<FormData>({
  Component: ({ resolve, reject }) => {
    const form = useForm<FormData>({
      resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = useCallback((data) => {
      resolve(data);
    }, []);

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h1>What's your name?</h1>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div>
                  <FormLabel>
                    <h1 className="py-2">User Name</h1>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <div className="flex flex-1 justify-end gap-4">
              <Button variant="secondary" onClick={reject}>
                Cancel
              </Button>
              <Button type="submit">Confirm</Button>
            </div>
          </div>
        </form>
      </Form>
    );
  },
});
