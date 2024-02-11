import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

const callAPI = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body: any = {}
) => {
  try {
    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("access_token")}`
    );
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: method,
      // headers: headers,
      body: method != "GET" ? JSON.stringify(body) : null,
    });
    if (response.status == 200) {
      return response.json();
    }
    let error;
    if (response.status == 401) {
      error = "Session time out!";
      setTimeout(() => {
        sessionStorage.clear();
        redirect("/login");
      }, 2000);
    } else if (response.status == 400) {
      const json = await response.json();
      error = json.error ?? "Invalid request!";
    } else {
      error = "Something went wrong! Please try again later!";
    }
    toast({
      title: "Uh oh!",
      variant: "destructive",
      description: error,
    });
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { callAPI };
