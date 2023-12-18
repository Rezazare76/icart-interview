/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, AddTicket, Chat, TicketListLoading } from "components";
import { domain } from "utils/const";
import useSWR from "swr";
import moment from "jalali-moment";
import AddLineIcon from "remixicon-react/AddLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
const Tickets = () => {
  const [section, setSection] = useState<"AddTicket" | "Chat" | "List">("List");
  const [currentTicket, setCurrentTicket] = useState<number | null>();

  // **********start ticket/list**************
  const userTicketListFetch = async (url: string) => {
    const userToken = sessionStorage.getItem("userToken");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({}),
    });

    return response.json();
  };
  const {
    data: ticketListResponse,
    error: ticketListError,
    isLoading: ticketListLoading,
    mutate: getListAgain,
  } = useSWR(`${domain}ticket/list?skip=0&limit=100`, userTicketListFetch);
  // **********end ticket/list**************
  // **********start ticket/find**************
  const userTicketMessageFetch = async (url: string) => {
    const userToken = sessionStorage.getItem("userToken");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.json();
  };
  const {
    data: ticketListMessageResponse,
    error: ticketListMessageError,
    isLoading: ticketListMessageLoading,
    mutate: ticketListMessageMutate,
  } = useSWR(
    currentTicket ? `${domain}ticket/find?ticket_id=${currentTicket}` : null,
    userTicketMessageFetch
  );
  // **********start ticket/find**************

  const sections: { [key: string]: React.ReactNode } = {
    AddTicket: (
      <AddTicket getListAgain={getListAgain}>
        <ArrowRightLineIcon
          onClick={() => setSection("List")}
          className="inline-block ml-2 cursor-pointer md:hidden"
        />
      </AddTicket>
    ),
    Chat: (
      <Chat
        messageList={ticketListMessageResponse?.messages}
        isLoading={ticketListMessageLoading}
        code={ticketListMessageResponse?.number}
        title={ticketListMessageResponse?.title}
        mutate={ticketListMessageMutate}
        ticketId={ticketListMessageResponse?.id}
      >
        <ArrowRightLineIcon
          onClick={() => setSection("List")}
          className="inline-block ml-2 cursor-pointer md:hidden"
        />
      </Chat>
    ),
    List: (
      <AddTicket getListAgain={getListAgain}>
        <ArrowRightLineIcon
          onClick={() => setSection("List")}
          className="inline-block ml-2 cursor-pointer md:hidden"
        />
      </AddTicket>
    ),
  };

  return (
    <>
      <h1 className="font-bold text-xl xs:text-2xl">تیکت ها</h1>
      <main className="flex mt-6 sm:mt-12 h-[84%] w-full gap-[10px]">
        <aside
          className={`${
            section == "List" ? " flex flex-col" : "hidden md:flex md:flex-col"
          } bg-tertiary-100 h-[600px] md:h-auto rounded-xl py-5 w-full md:w-1/4`}
        >
          <h1 className="py-4 px-5 text-lg font-medium">لیست تیکت ها</h1>
          <div className="overflow-auto h-full" dir="ltr">
            <ul
              className="list flex flex-col col-reverse items-stretch"
              dir="rtl"
            >
              {/* TODO disable any type for this */}
              {ticketListResponse?.map((elm: any, inx: any) => (
                <li
                  key={`tickets-${inx}-${elm.title}`}
                  className="relative p-4 border-b-2 mx-2 whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    setSection("Chat");
                    setCurrentTicket(elm.id);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-ellipsis w-full overflow-hidden  text-sm">
                      {elm.title}
                    </span>
                    <span className="text-xs text-tertiary-400 " dir="ltr">
                      {moment(elm.created_at).format("jYYYY/jMM/jDD")}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <p className=" text-ellipsis w-full overflow-hidden text-xs">
                      {elm.type}
                    </p>
                    {!!elm.unread_user && (
                      <div
                        className="text-tertiary-100
                   bg-primary-400 rounded-full font-medium not-italic text-2xs flex items-center justify-center w-[15px] h-[15px]"
                      >
                        {elm.unread_user}
                      </div>
                    )}
                  </div>

                  <i
                    className={`${
                      currentTicket == elm.id
                        ? "bg-opacity-100"
                        : "bg-opacity-0"
                    } transition-all-1s absolute right-0 top-[50%] h-[80%] w-[2px] bg-primary-500 
                    translate-x-[-50%] translate-y-[-50%] rounded`}
                  />
                </li>
              ))}
              {ticketListLoading && <TicketListLoading />}
            </ul>
          </div>

          <Button
            text="ثبت تیکت جدید"
            icon={<AddLineIcon size={20} className="mx-1" />}
            onClick={() => {
              setSection("AddTicket");
              setCurrentTicket(null);
            }}
            className="bg-primary-500 text-center justify-center
        py-3 px-8 flex items-center tex-sm text-tertiary-100 rounded-xs font-bold mx-5"
          />
        </aside>
        <section
          className={`${
            section != "List" ? "block" : "hidden md:block"
          } bg-tertiary-100 rounded-xl p-5 w-full overflow-auto`}
        >
          {sections[section]}
        </section>
      </main>
    </>
  );
};

export default Tickets;
