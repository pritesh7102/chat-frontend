import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const resUsers = await axiosInstance.get("/messages/users");
      const resGroups = await axiosInstance.get("/groups/groups");

      // Add `isGroup` = false for users
      const usersWithFlag = resUsers.data.map((user) => ({
        ...user,
        isGroup: false,
      }));

      // Add `isGroup` = true for groups
      const groupsWithFlag = resGroups.data.map((group) => ({
        ...group,
        isGroup: true,
      }));

      // Merge both arrays
      set({ users: [...usersWithFlag, ...groupsWithFlag] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    const { selectedUser } = get();
    set({ isMessagesLoading: true });
    try {
      if (selectedUser.isGroup) {
        const res = await axiosInstance.get(`/groups/get/${selectedUser._id}`);
        set({ messages: res.data });
      } else {
        const res = await axiosInstance.get(`/messages/${selectedUser._id}`);
        set({ messages: res.data });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      let res;
      if (selectedUser.isGroup) {
        res = await axiosInstance.post(
          `/groups/send/${selectedUser._id}`,
          messageData
        );
      } else {
        res = await axiosInstance.post(
          `/messages/send/${selectedUser._id}`,
          messageData
        );
      }
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      console.log("xxxnewMessage", newMessage);
      console.log("xxxselectedUser", selectedUser);
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      const isGroupMessage = newMessage.receiverId === selectedUser._id;
      if (!isMessageSentFromSelectedUser && !isGroupMessage) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
