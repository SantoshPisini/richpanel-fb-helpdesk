import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import Image from "next/image";

export default function AgentChat() {
  const CHATS = [
    {
      id: "6f8ce141-4cac-4edd-b5c9-f305b16b0538",
      sender_id: 23123123,
      message: "Curabitur in libero ut massa volutpat convallis.",
      time: 1680711647000,
      agent_id: 2112422,
    },
    {
      id: "b265ce34-c260-4dd5-ae64-c37f8c4e7d3c",
      sender_id: 23123123,
      message: "Nam nulla.",
      time: 1694814930000,
      agent_id: 2112422,
    },
    {
      id: "7b03c643-93c7-44f3-8457-f3d637f78ea7",
      sender_id: 23123124,
      message:
        "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      time: 1692049632000,
      agent_id: 2112422,
    },
    {
      id: "70eb88b5-0871-40be-826b-cd731747b392",
      sender_id: 23123123,
      message: "Aliquam quis turpis eget elit sodales scelerisque.",
      time: 1697845197000,
      agent_id: 2112422,
    },
    {
      id: "f0566083-4fd8-4592-afee-c510d7a02848",
      sender_id: 23123123,
      message: "Suspendisse potenti.",
      time: 1697845197000,
      agent_id: 2112422,
    },
    {
      id: "a6ac39a1-9203-4fb3-b352-ee4046490e9e",
      sender_id: 23123124,
      message: "Maecenas rhoncus aliquam lacus.",
      time: 1682832249000,
      agent_id: 2112422,
    },
    {
      id: "d4c10e75-2579-4bad-b719-1035c230eb9d",
      sender_id: 23123123,
      message: "Nulla nisl.",
      time: 1707290208000,
      agent_id: 2112422,
    },
    {
      id: "ba561b2c-f56d-4d88-9fcb-c3c1edef0601",
      sender_id: 23123123,
      message: "Etiam vel augue.",
      time: 1706451079000,
      agent_id: 2112422,
    },
    {
      id: "62b4d40c-85c1-4f00-bbee-309df50decba",
      sender_id: 23123124,
      message: "Phasellus sit amet erat.",
      time: 1684033676000,
      agent_id: 2112422,
    },
    {
      id: "fcd6b074-f08c-4af4-88bf-ea342b77557f",
      sender_id: 23123124,
      message: "Integer non velit.",
      time: 1684033676000,
      agent_id: 2112422,
    },
  ];
  return (
    <>
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-semibold h-16 ml-4 flex items-center">
          Santosh Pisini
        </h2>
        <div className="bg-slate-100 h-[calc(100%-64px)] px-4 py-8">
          <div className="h-[calc(100%-36px)]">
            <div className="h-[calc(100%-36px)] overflow-scroll">
              <div className="flex flex-row gap-4 items-end">
                <span className="mb-1 min-w-8 min-h-8">
                  <Image
                    src="https://i.pravatar.cc/150"
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="Picture of the author"
                  />
                </span>
                <div className="flex flex-col gap-2">
                  <span className="p-2 bg-white border border-gray-200 rounded-lg shadow w-fit">
                    Hi
                  </span>
                  <span className="p-2 bg-white border border-gray-200 rounded-lg shadow w-fit">
                    This is an temp message that we want to discuss.
                  </span>
                  <span className="p-2 bg-white border border-gray-200 rounded-lg shadow w-fit">
                    . This is an temp message that .This is an temp message that
                    .This is an temp message that .This is an temp message that
                    .This is an temp message that .This is an temp message that
                    .This is an temp message that .This is an temp message that
                    . This is an temp message that .This is an temp message that
                    .This is an temp message that .This is an temp message that
                    .This is an temp message that .This is an temp message that
                    .This is an temp message that .This is an temp message that
                    .
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium ml-12">
                Santosh Pisini - Mar 23, 2:22 AM
              </span>
            </div>
          </div>
          <div className="relative bottom-4 flex flex-row gap-2">
            <Input
              type="text"
              placeholder="Message Santosh Pisini"
              maxLength={500}
            ></Input>
            <Button type="submit">Send</Button>
          </div>
        </div>
      </div>
    </>
  );
}
