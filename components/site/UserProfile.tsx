import Image from "next/image";
import { Button } from "../ui/button";
import { CircleUser, Phone } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Link from "next/link";
import { ConvoResponseModel } from "@/models/Response/ConvoResponseModel";

export default function UserProfile({
  data,
}: {
  data: ConvoResponseModel | null;
}) {
  return (
    <div className="h-full">
      <div className="h-2/6 flex flex-col gap-1 items-center justify-center">
        <Image
          src="https://i.pravatar.cc/150"
          width={80}
          height={80}
          className="rounded-full"
          alt="Picture of the author"
        />
        <span className="font-semibold text-lg">
          {data?.messages[0].message_from_name}
        </span>
        <span className="text-sm text-gray-500">
          <span className="relative inline-flex rounded-full h-2 w-2 mr-1 bg-gray-500"></span>
          Offline
        </span>
        <div className="my-4 space-x-2">
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" /> Call
          </Button>
          <Button variant="outline" size="sm">
            <CircleUser className="mr-2 h-4 w-4" /> Profile
          </Button>
        </div>
      </div>
      <div className="h-4/6 bg-blue-50 p-4">
        <Card className="p-3">
          <CardTitle className="text-base">Customer Details</CardTitle>
          <CardContent className="text-sm p-0 space-y-2 my-4">
            <div className="flow-root">
              <p className="float-left text-muted-foreground">Email</p>
              <p className="float-right">
                {data?.messages[0].message_from_email}
              </p>
            </div>
            <div className="flow-root">
              <p className="float-left text-muted-foreground">First Name</p>
              <p className="float-right">
                {data?.messages[0].message_from_name.split(" ")[0]}
              </p>
            </div>
            <div className="flow-root">
              <p className="float-left text-muted-foreground">Last Name</p>
              <p className="float-right">
                {data?.messages[0].message_from_name.split(" ")[1] ?? ""}
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Link href={""} className="text-primary font-semibold text-sm">
              View more details
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
