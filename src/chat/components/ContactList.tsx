import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLink, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/fake/fake-data";
import { Loading } from "@/components/custom/Loading";

export const ContactList = () => {
  const { id } = useParams();

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
    staleTime: 1000 * 60 * 5,
  });

  const colorIcons = [
    "bg-blue-500",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-lime-500",
    "bg-purple-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-stone-500",
    "bg-zinc-500",
    "bg-neutral-500",
    "bg-gray-500",
    "bg-slate-500",
    "bg-blue-400",
    "bg-emerald-400",
    "bg-pink-400",
  ];

  const getColorForName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colorIcons.length;
    return colorIcons[index];
  };

  return (
    <>
      <ScrollArea className="flex-1">
        <div className="py-2">
          {/* Contacts */}
          <div className="px-3 py-2">
            <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1.5">
              Contactos
            </h3>
            {isLoading && <Loading />}
            <div className="space-y-0.5">
              {clients?.map((user) => (
                <NavLink
                  to={`/chat/${user.id}`} 
                  key={user.id} 
                  className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors group ${
                    id === user.id ? "bg-gray-100" : "" 
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`h-8 w-8 rounded-full ${getColorForName(
                        user.name
                      )} flex items-center justify-center text-white text-[11px] font-semibold`}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <span
                    className={`flex-1 text-[13px] font-medium ${
                      id === user.id ? "text-blue-600" : "text-gray-900" 
                    } text-left truncate`}
                  >
                    {user.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};