"use client";

import { createContext, useContext, type ReactNode } from "react";

// ChatContext — tiny context exposing `openChat()` to descendants of MainNav.
// MainNav owns the open/close state and renders ChatDrawer; this context
// lets nested screens (FoodLogForm's Ask-cookbook button, future Library
// suggested-recipe row, etc.) trigger the same drawer without re-mounting it.
//
// Defaulting to a no-op when used outside the provider is intentional: it
// keeps the Storybook / isolated tests of consumer components from throwing,
// and surfaces "drawer not wired" as a silent no-op in dev rather than a
// crash. Real wiring happens in MainNav.tsx.

interface ChatContextValue {
  openChat: () => void;
}

const ChatContext = createContext<ChatContextValue>({
  openChat: () => {},
});

export function useChat(): ChatContextValue {
  return useContext(ChatContext);
}

interface ChatProviderProps {
  openChat: () => void;
  children: ReactNode;
}

export function ChatProvider({ openChat, children }: ChatProviderProps) {
  return (
    <ChatContext.Provider value={{ openChat }}>{children}</ChatContext.Provider>
  );
}
