"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import {
  LoaderCircle,
  MoreHorizontalIcon,
  Save,
  Search,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { deletePrompt, getSearchPrompts, savePrompt } from "@/app/redux/slice";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();

  useEffect(() => {
    dispatch(getSearchPrompts());
  }, [dispatch]);

  const { prompts, status } = useSelector((state: RootState) => state.search);

  const handleDelete = (promptId: string) => {
    dispatch(deletePrompt(promptId));
    setOpenPopoverId(null);
  };

  const handleSave = (promptId: string) => {
    dispatch(savePrompt(promptId));
    setOpenPopoverId(null);
    toast.success("Saved");
  };

  const filteredHistory = prompts.filter(
    (item: { prompt: string; userId: string }) =>
      item.userId === user?.id &&
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-[350px] bg-gray-900 text-white">
      <div className="flex items-center justify-start px-6 py-4 border-b border-gray-700">
        <div className="relative w-10 h-10 mr-4">
          <Image fill alt="logo" src="/logo.svg" />
        </div>
        <h1 className={cn(`text-xl font-bold`, montserrat.className)}>
          Promptly
        </h1>
      </div>

      <div className="px-6 py-4 border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-2.5 right-3 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="px-6 py-4 flex-1">
        <h2 className="text-lg font-semibold mb-3">Prompt History</h2>
        <div className="space-y-3">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item: { id: string; prompt: string }) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <span className="text-sm truncate">{item.prompt}</span>
                <Popover
                  open={openPopoverId === item.id}
                  onOpenChange={(isOpen) =>
                    setOpenPopoverId(isOpen ? item.id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <button
                      aria-label="More options"
                      className="p-2 rounded-full hover:bg-gray-500 transition-colors"
                    >
                      <MoreHorizontalIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    side="right"
                    className="w-48 bg-[#111827] rounded-lg shadow-md p-4"
                  >
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleSave(item.id)}
                        className="w-full flex items-center gap-2 text-left text-sm px-4 py-2 text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <Save size={15} />
                        Save
                      </button>
                      <hr />
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-full flex items-center gap-2 text-left text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-red-600"
                      >
                        <Trash size={15} />
                        Delete
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No Prompts.</p>
          )}
          {status === "loading" && (
            <div className="flex h-full w-full justify-center items-center">
              <LoaderCircle className="animate-spin w-5 h-5" />
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;
