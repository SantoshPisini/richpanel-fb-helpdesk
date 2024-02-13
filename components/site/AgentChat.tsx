import { ConvoResponseModel } from "@/models/Response/ConvoResponseModel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { callAPI } from "@/lib/http";

export default function AgentChat({
  data,
}: {
  data: ConvoResponseModel | null;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    data &&
      document
        .getElementById(data?.messages[data?.messages.length - 1]._id)
        ?.scrollIntoView();
  }, []);

  async function sendMessage() {
    const response = await callAPI("api/conversations/message", "POST", {
      message: text.trim(),
      conversation_id: data?.messages[0].message_from_id,
    });
    if (response) {
      setText("");
      // Hack
      document.getElementById("force-refresh")?.click();
    }
  }
  const user = data?.messages[0].message_from_id;
  return (
    <>
      {data == null && "No Chat Selected!"}
      {data && (
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-semibold h-16 ml-4 flex items-center">
            {data.messages[0].message_from_name}
          </h2>
          <div className="bg-slate-100 h-[calc(100%-64px)] px-4 py-8">
            <div className="h-[calc(100%-36px)]">
              <div className="h-[calc(100%-36px)] overflow-scroll">
                {data.messages.map((message, i) => {
                  return message.message_from_id == user ? (
                    <div>
                      <div
                        className="flex flex-row gap-4 items-end"
                        key={message._id}
                        id={message._id}
                      >
                        <span className="mb-1 min-w-8 min-h-8">
                          {i + 1 == data.messages.length ||
                          data.messages[i + 1].message_from_id !==
                            message.message_from_id ? (
                            <Image
                              src="https://i.pravatar.cc/150"
                              width={32}
                              height={32}
                              className="rounded-full"
                              alt="Picture of the author"
                            />
                          ) : (
                            <></>
                          )}
                        </span>
                        <span className="p-2 m-1 bg-white border border-gray-200 rounded-lg shadow w-fit">
                          {message.message}
                        </span>
                      </div>
                      {i + 1 == data.messages.length ||
                      data.messages[i + 1].message_from_id !==
                        message.message_from_id ? (
                        <span className="text-xs font-medium ml-12">
                          {message.message_from_name +
                            " - " +
                            format(
                              new Date(message.created_time),
                              "MMM dd, h:mm a"
                            )}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col w-full items-end">
                      <div
                        className="flex flex-row-reverse gap-4 items-end"
                        key={message._id}
                        id={message._id}
                      >
                        <span className="mb-1 min-w-8 min-h-8">
                          {i + 1 == data.messages.length ||
                          data.messages[i + 1].message_from_id !==
                            message.message_from_id ? (
                            <Image
                              src="https://i.pravatar.cc/150"
                              width={32}
                              height={32}
                              className="rounded-full"
                              alt="Picture of the author"
                            />
                          ) : (
                            <></>
                          )}
                        </span>
                        <div className="flex flex-col gap-2">
                          <span className="p-2 m-1 bg-white border border-gray-200 rounded-lg shadow w-fit">
                            {message.message}
                          </span>
                        </div>
                      </div>
                      {i + 1 == data.messages.length ||
                      data.messages[i + 1].message_from_id !==
                        message.message_from_id ? (
                        <span className="text-xs font-medium mr-12">
                          {message.message_from_name +
                            " - " +
                            format(
                              new Date(message.created_time),
                              "MMM dd, h:mm a"
                            )}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative bottom-4 flex flex-row gap-2">
              <Input
                type="text"
                placeholder={"Message " + data.messages[0].message_from_name}
                maxLength={500}
                onChange={(e) => setText(e.target.value)}
              ></Input>
              <Button type="submit" onClick={sendMessage} disabled={!text}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
