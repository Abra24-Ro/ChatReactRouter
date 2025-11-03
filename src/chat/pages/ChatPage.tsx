"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Copy,
  ThumbsUp,
  ThumbsDown,
  Send,
  Loader,
  User,
  Bot,
} from "lucide-react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClientMessages, sendMessage } from "@/fake/fake-data";
import type { Message } from "../interfaces/chat.interface";

const ChatPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [option, setOption] = useState<Message["sender"]>("agent");

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getClientMessages(id ?? ""),
    placeholderData: [],
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      queryClient.setQueryData(["messages", id], (oldMessages: Message[]) => [
        ...oldMessages,
        newMessage,
      ]);
    },
    onError: (error) => console.error("Error al enviar mensaje:", error),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessageMutation({
      clientId: id ?? "",
      content: input.trim(),
      sender: option,
      createdAt: new Date(),
    });
    setInput("");
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Chat messages */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages?.map((message, index) => (
              <div key={index} className="w-full animate-fadeIn">
                {message.sender === "agent" ? (
                  <div className="flex gap-3 items-start">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 max-w-[75%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          NexBot
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.createdAt.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <button
                          className="h-8 w-8 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copiar mensaje"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          className="h-8 w-8 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-green-600 transition-colors"
                          title="Me gustó"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          className="h-8 w-8 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
                          title="No me gustó"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="flex flex-col items-end max-w-[75%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">
                          {message.createdAt.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          Tú
                        </span>
                      </div>
                      <div className="bg-[#0969da] text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm w-fit">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {messages?.length === 0 && (
              <div className="flex-1 flex items-center justify-center py-10">
                <p className="text-gray-500 text-sm">No hay mensajes aún</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white px-6 py-4 shrink-0">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-end gap-3"
        >
          {/* Mejor opción: botones tipo toggle en vez de select */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg border border-gray-300">
            <button
              type="button"
              onClick={() => setOption("agent")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                option === "agent"
                  ? "bg-white border border-gray-300 shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Bot className="h-4 w-4" />
              Agente
            </button>
            <button
              type="button"
              onClick={() => setOption("client")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                option === "client"
                  ? "bg-white border border-gray-300 shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <User className="h-4 w-4" />
              Cliente
            </button>
          </div>

          {/* Input */}
          <div className="flex-1 relative">
            <Textarea
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(
                    e as unknown as React.FormEvent<HTMLFormElement>
                  );
                }
              }}
              className="min-h-[48px] max-h-[120px] resize-none rounded-3xl border-2 border-gray-300 px-5 py-3 text-sm placeholder:text-gray-400 focus:ring-0 focus:border-blue-500 hover:border-gray-400 transition-colors"
              rows={1}
            />
          </div>

          {/* Botón enviar */}
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-[#0969da] hover:bg-[#0555b0] text-white shrink-0 active:scale-95 transition-all"
            title="Enviar mensaje"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
