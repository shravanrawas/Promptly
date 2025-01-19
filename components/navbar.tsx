import React from "react";
import { UserButton } from "@clerk/nextjs";
import Mobilesidebar from "./mobilesidebar";
import { MessageCircle, SaveIcon } from "lucide-react";
import { usePathname } from "next/navigation";

function Navbar() {

  const pathname = usePathname();

  return (
    <div className="flex justify-between bg-blue-500 items-center p-3.5">

      <Mobilesidebar />

      <div className="text-white font-bold">
         {pathname === '/savedconversation' ? 'Saved Conversations' : 'Conversation'}
      </div>

      <div>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Conversation"
            labelIcon={<MessageCircle size={15} />}
            href="/conversation"
          />
          <UserButton.Link
            label="Saved Conversation"
            labelIcon={<SaveIcon size={15} />}
            href="/savedconversation"
          />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
      </div>

    </div>
  );
}

export default Navbar;
